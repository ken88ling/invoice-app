import { db } from '@/lib/db'
import { Customer } from '@/types/customer'
import { CreateCustomerInput, UpdateCustomerInput } from '@/lib/validations/customer'
import { BaseRepository, FindManyOptions } from './base.repository'

export class CustomerRepository extends BaseRepository<Customer> {
  async findMany(options: FindManyOptions = {}): Promise<Customer[]> {
    const { search, limit, offset, orderBy } = options

    return db.customer.findMany({
      where: search ? {
        OR: [
          { name: { contains: search } },
          { email: { contains: search } },
          { company: { contains: search } },
        ]
      } : {},
      orderBy: orderBy || { createdAt: 'desc' },
      take: limit,
      skip: offset,
      include: {
        _count: {
          select: {
            invoices: true
          }
        }
      }
    }) as Promise<Customer[]>
  }

  async findUnique(id: string): Promise<Customer | null> {
    return db.customer.findUnique({
      where: { id },
      include: {
        invoices: {
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        _count: {
          select: {
            invoices: true
          }
        }
      }
    }) as Promise<Customer | null>
  }

  async create(data: CreateCustomerInput): Promise<Customer> {
    return db.customer.create({
      data,
      include: {
        _count: {
          select: {
            invoices: true
          }
        }
      }
    }) as Promise<Customer>
  }

  async update(id: string, data: UpdateCustomerInput): Promise<Customer> {
    return db.customer.update({
      where: { id },
      data,
      include: {
        _count: {
          select: {
            invoices: true
          }
        }
      }
    }) as Promise<Customer>
  }

  async delete(id: string): Promise<void> {
    await db.customer.delete({
      where: { id }
    })
  }

  async hasInvoices(id: string): Promise<boolean> {
    const customer = await db.customer.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            invoices: true
          }
        }
      }
    })

    return (customer?._count.invoices ?? 0) > 0
  }
}