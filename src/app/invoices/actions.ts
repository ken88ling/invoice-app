'use server'

import { CustomerService } from '@/services/customer.service'
import { InvoiceService } from '@/services/invoice.service'
import { CreateInvoiceInput, UpdateInvoiceInput } from '@/lib/validations/invoice'

// Customer actions
export async function getCustomers() {
  return CustomerService.getCustomers()
}

// Invoice actions
export async function getInvoice(id: string) {
  return InvoiceService.getInvoice(id)
}

export async function getInvoices(search?: string) {
  return InvoiceService.getInvoices(search)
}

export async function createInvoice(data: CreateInvoiceInput) {
  return InvoiceService.createInvoice(data)
}

export async function updateInvoice(id: string, data: UpdateInvoiceInput) {
  return InvoiceService.updateInvoice(id, data)
}

export async function deleteInvoice(id: string) {
  return InvoiceService.deleteInvoice(id)
}