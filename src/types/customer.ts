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

export interface CreateCustomerData {
  name: string
  email: string
  phone?: string
  company?: string
  address?: string
  taxId?: string
}

export interface UpdateCustomerData extends CreateCustomerData {}