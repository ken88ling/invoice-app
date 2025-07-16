import { z } from 'zod'

export const invoiceItemSchema = z.object({
  description: z.string().min(1, 'Description is required').max(255),
  quantity: z.number().int('Quantity must be a whole number').positive('Quantity must be positive'),
  rate: z.number().positive('Rate must be positive'),
  amount: z.number().positive('Amount must be positive'),
})

export const invoiceSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  number: z.string().max(50),
  issueDate: z.date(),
  dueDate: z.date(),
  status: z.enum(['DRAFT', 'SENT', 'PAID', 'OVERDUE', 'CANCELLED']).default('DRAFT'),
  subtotal: z.number().min(0, 'Subtotal must be non-negative'),
  taxRate: z.number().min(0, 'Tax rate must be non-negative').max(1, 'Tax rate must be less than 100%').default(0),
  taxAmount: z.number().min(0, 'Tax amount must be non-negative'),
  total: z.number().min(0, 'Total must be non-negative'),
  notes: z.string().max(1000).optional(),
  items: z.array(invoiceItemSchema).min(1, 'At least one item is required'),
})

export const createInvoiceSchema = invoiceSchema.omit({ status: true }).required({ taxRate: true })
export const updateInvoiceSchema = invoiceSchema.partial().required({ customerId: true })

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>
export type UpdateInvoiceInput = z.infer<typeof updateInvoiceSchema>
export type InvoiceItemInput = z.infer<typeof invoiceItemSchema>