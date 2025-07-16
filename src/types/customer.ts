export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  address?: string
  taxId?: string
  createdAt: Date
  updatedAt: Date
  _count: {
    invoices: number
  }
}