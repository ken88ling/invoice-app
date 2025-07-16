import { db } from '@/lib/db'
import { Invoice, InvoiceListItem, InvoiceStatus } from '@/types/invoice'
import { CreateInvoiceInput, UpdateInvoiceInput } from '@/lib/validations/invoice'
import { BaseRepository, FindManyOptions } from './base.repository'

export class InvoiceRepository extends BaseRepository<Invoice> {
  async findMany(options: FindManyOptions = {}): Promise<Invoice[]> {
    const { search, limit, offset, orderBy } = options

    const invoices = await db.invoice.findMany({
      where: search ? {
        OR: [
          { number: { contains: search } },
          { customer: { name: { contains: search } } },
          { customer: { email: { contains: search } } },
        ]
      } : {},
      orderBy: orderBy || { createdAt: 'desc' },
      take: limit,
      skip: offset,
      include: {
        customer: true,
        items: true,
        payments: true,
      },
    })

    return invoices.map(invoice => ({
      ...invoice,
      customer: {
        ...invoice.customer,
        _count: { invoices: 0 } // This would need proper calculation if needed
      }
    })) as Invoice[]
  }

  async findManyListItems(options: FindManyOptions = {}): Promise<InvoiceListItem[]> {
    const { search, limit, offset, orderBy } = options

    const invoices = await db.invoice.findMany({
      where: search ? {
        OR: [
          { number: { contains: search } },
          { customer: { name: { contains: search } } },
          { customer: { email: { contains: search } } },
        ]
      } : {},
      orderBy: orderBy || { createdAt: 'desc' },
      take: limit,
      skip: offset,
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        payments: {
          select: {
            amount: true,
          }
        }
      }
    })

    return invoices.map(invoice => ({
      id: invoice.id,
      number: invoice.number,
      customer: invoice.customer,
      issueDate: invoice.issueDate,
      dueDate: invoice.dueDate,
      status: invoice.status as InvoiceStatus,
      total: invoice.total,
      paidAmount: invoice.payments.reduce((sum, payment) => sum + payment.amount, 0),
      createdAt: invoice.createdAt,
    }))
  }

  async findUnique(id: string): Promise<Invoice | null> {
    const invoice = await db.invoice.findUnique({
      where: { id },
      include: {
        customer: true,
        items: {
          orderBy: { createdAt: 'asc' }
        },
        payments: {
          orderBy: { paymentDate: 'desc' }
        }
      }
    })

    return invoice as Invoice | null
  }

  async create(data: CreateInvoiceInput): Promise<Invoice> {
    const { items, ...invoiceData } = data

    const invoice = await db.invoice.create({
      data: {
        ...invoiceData,
        items: {
          create: items
        }
      },
      include: {
        customer: true,
        items: {
          orderBy: { createdAt: 'asc' }
        },
        payments: true
      }
    })

    return invoice as Invoice
  }

  async update(id: string, data: UpdateInvoiceInput): Promise<Invoice> {
    const { items, ...invoiceData } = data

    // If items are provided, replace all items
    if (items) {
      await db.invoiceItem.deleteMany({
        where: { invoiceId: id }
      })
    }

    const invoice = await db.invoice.update({
      where: { id },
      data: {
        ...invoiceData,
        ...(items && {
          items: {
            create: items
          }
        })
      },
      include: {
        customer: true,
        items: {
          orderBy: { createdAt: 'asc' }
        },
        payments: true
      }
    })

    return invoice as Invoice
  }

  async delete(id: string): Promise<void> {
    await db.invoice.delete({
      where: { id }
    })
  }

  async generateInvoiceNumber(): Promise<string> {
    const currentYear = new Date().getFullYear()
    const prefix = `INV-${currentYear}-`
    
    const lastInvoice = await db.invoice.findFirst({
      where: {
        number: {
          startsWith: prefix
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (!lastInvoice) {
      return `${prefix}001`
    }

    const lastNumber = parseInt(lastInvoice.number.split('-')[2])
    const nextNumber = (lastNumber + 1).toString().padStart(3, '0')
    
    return `${prefix}${nextNumber}`
  }

  async findByCustomer(customerId: string): Promise<InvoiceListItem[]> {
    const invoices = await db.invoice.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        payments: {
          select: {
            amount: true,
          }
        }
      }
    })

    return invoices.map(invoice => ({
      id: invoice.id,
      number: invoice.number,
      customer: invoice.customer,
      issueDate: invoice.issueDate,
      dueDate: invoice.dueDate,
      status: invoice.status as InvoiceStatus,
      total: invoice.total,
      paidAmount: invoice.payments.reduce((sum, payment) => sum + payment.amount, 0),
      createdAt: invoice.createdAt,
    }))
  }
}