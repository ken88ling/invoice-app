import { InvoiceCalculations } from '@/types/invoice'
import { InvoiceItemInput } from '@/lib/validations/invoice'

/**
 * Client-safe invoice calculation utilities
 * These functions don't require database access and can be used in client components
 */

export function calculateInvoiceTotals(items: InvoiceItemInput[], taxRate: number = 0): InvoiceCalculations {
  const subtotal = items.reduce((sum, item) => {
    const itemTotal = item.quantity * item.rate
    return sum + itemTotal
  }, 0)

  const taxAmount = subtotal * taxRate
  const total = subtotal + taxAmount

  return {
    subtotal: Number(subtotal.toFixed(2)),
    taxAmount: Number(taxAmount.toFixed(2)),
    total: Number(total.toFixed(2)),
  }
}

export function calculateItemAmount(quantity: number, rate: number): number {
  return Number((quantity * rate).toFixed(2))
}