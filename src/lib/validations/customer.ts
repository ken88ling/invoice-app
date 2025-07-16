import { z } from 'zod'

export const customerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255).trim(),
  email: z.string().email('Invalid email address').toLowerCase(),
  phone: z.string().optional(),
  company: z.string().max(255).optional(),
  address: z.string().max(500).optional(),
  taxId: z.string().max(50).optional(),
})

export const createCustomerSchema = customerSchema
export const updateCustomerSchema = customerSchema

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>