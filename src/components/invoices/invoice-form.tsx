"use client"

import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Invoice } from '@/types/invoice'
import { Customer } from '@/types/customer'
import { createInvoiceSchema, CreateInvoiceInput, InvoiceItemInput } from '@/lib/validations/invoice'
import { calculateInvoiceTotals, calculateItemAmount } from '@/lib/invoice-calculations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Trash2, Plus } from 'lucide-react'

interface InvoiceFormProps {
  invoice?: Invoice | null
  customers: Customer[]
  onSave: (data: CreateInvoiceInput) => Promise<void>
  onCancel: () => void
}

export function InvoiceForm({ invoice, customers, onSave, onCancel }: InvoiceFormProps) {
  const [loading, setLoading] = useState(false)
  const [calculations, setCalculations] = useState({ subtotal: 0, taxAmount: 0, total: 0 })
  const isEditing = !!invoice

  const form = useForm<CreateInvoiceInput>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: {
      customerId: invoice?.customerId || '',
      number: invoice?.number || '',
      issueDate: invoice?.issueDate || new Date(),
      dueDate: invoice?.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      subtotal: invoice?.subtotal || 0,
      taxRate: invoice?.taxRate || 0,
      taxAmount: invoice?.taxAmount || 0,
      total: invoice?.total || 0,
      notes: invoice?.notes || '',
      items: invoice?.items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        rate: item.rate,
        amount: item.amount,
      })) || [{
        description: '',
        quantity: 1,
        rate: 0,
        amount: 0,
      }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  })

  const watchedItems = form.watch('items')
  const watchedTaxRate = form.watch('taxRate')

  useEffect(() => {
    const newCalculations = calculateInvoiceTotals(watchedItems, watchedTaxRate)
    setCalculations(newCalculations)
    
    form.setValue('subtotal', newCalculations.subtotal)
    form.setValue('taxAmount', newCalculations.taxAmount)
    form.setValue('total', newCalculations.total)
  }, [watchedItems, watchedTaxRate, form])

  const handleItemChange = (index: number, field: keyof InvoiceItemInput, value: string | number) => {
    const currentItems = form.getValues('items')
    const updatedItems = [...currentItems]
    
    if (field === 'quantity' || field === 'rate') {
      const numericValue = typeof value === 'string' ? parseFloat(value) || 0 : value
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: numericValue,
        amount: field === 'quantity' 
          ? calculateItemAmount(numericValue, updatedItems[index].rate)
          : calculateItemAmount(updatedItems[index].quantity, numericValue)
      }
    } else {
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      }
    }
    
    form.setValue('items', updatedItems)
  }

  const handleSubmit = async (data: CreateInvoiceInput) => {
    try {
      setLoading(true)
      await onSave(data)
    } catch (error) {
      console.error('Error saving invoice:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>
          {isEditing ? 'Edit Invoice' : 'Create New Invoice'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Invoice Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="customerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer *</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a customer" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px] overflow-y-auto z-50">
                          {customers.length === 0 ? (
                            <div className="py-2 px-2 text-sm text-muted-foreground">
                              No customers found
                            </div>
                          ) : (
                            customers.map((customer) => (
                              <SelectItem key={customer.id} value={customer.id}>
                                {customer.name} - {customer.email}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Number *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Leave empty to auto-generate" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="issueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Date *</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field} 
                        value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date *</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field} 
                        value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Line Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Line Items</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ description: '', quantity: 1, rate: 0, amount: 0 })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-5">
                      <FormField
                        control={form.control}
                        name={`items.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            {index === 0 && <FormLabel>Description</FormLabel>}
                            <FormControl>
                              <Input
                                placeholder="Item description"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name={`items.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            {index === 0 && <FormLabel>Qty</FormLabel>}
                            <FormControl>
                              <Input
                                type="number"
                                step="1"
                                min="1"
                                placeholder="1"
                                {...field}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value) || 1
                                  field.onChange(value)
                                }}
                                onBlur={(e) => {
                                  const value = parseInt(e.target.value) || 1
                                  handleItemChange(index, 'quantity', value)
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name={`items.${index}.rate`}
                        render={({ field }) => (
                          <FormItem>
                            {index === 0 && <FormLabel>Rate</FormLabel>}
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                {...field}
                                onChange={(e) => {
                                  const value = parseFloat(e.target.value) || 0
                                  field.onChange(value)
                                }}
                                onBlur={(e) => {
                                  const value = parseFloat(e.target.value) || 0
                                  handleItemChange(index, 'rate', value)
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name={`items.${index}.amount`}
                        render={({ field }) => (
                          <FormItem>
                            {index === 0 && <FormLabel>Amount</FormLabel>}
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                {...field}
                                readOnly
                                className="bg-muted"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-1">
                      {index === 0 && <div className="h-6"></div>}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tax and Totals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="taxRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Rate (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) / 100 || 0
                          field.onChange(value)
                        }}
                        value={field.value * 100}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${calculations.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${calculations.taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${calculations.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any notes or terms..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : isEditing ? 'Update Invoice' : 'Create Invoice'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}