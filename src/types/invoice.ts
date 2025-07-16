import { Customer } from './customer'

export interface InvoiceItem {
  id: string
  invoiceId: string
  description: string
  quantity: number
  rate: number
  amount: number
  createdAt: Date
}

export interface Invoice {
  id: string
  number: string
  customerId: string
  customer: Customer
  issueDate: Date
  dueDate: Date
  status: InvoiceStatus
  subtotal: number
  taxRate: number
  taxAmount: number
  total: number
  notes?: string
  createdAt: Date
  updatedAt: Date
  items: InvoiceItem[]
  payments: Payment[]
}

export interface Payment {
  id: string
  invoiceId: string
  amount: number
  paymentDate: Date
  method: PaymentMethod
  reference?: string
  notes?: string
  createdAt: Date
}

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED'
}

export enum PaymentMethod {
  CASH = 'CASH',
  CHECK = 'CHECK',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CREDIT_CARD = 'CREDIT_CARD',
  OTHER = 'OTHER'
}

export interface InvoiceListItem {
  id: string
  number: string
  customer: {
    id: string
    name: string
    email: string
  }
  issueDate: Date
  dueDate: Date
  status: InvoiceStatus
  total: number
  paidAmount: number
  createdAt: Date
}

export interface InvoiceCalculations {
  subtotal: number
  taxAmount: number
  total: number
}