"use client"

import { useState } from 'react'
import { InvoiceListItem, Invoice } from '@/types/invoice'
import { Customer } from '@/types/customer'
import { CreateInvoiceInput } from '@/lib/validations/invoice'
import { InvoiceList } from '@/components/invoices/invoice-list'
import { InvoiceForm } from '@/components/invoices/invoice-form'
import { getInvoice, createInvoice, updateInvoice, deleteInvoice } from '@/app/invoices/actions'

type ViewMode = 'list' | 'add' | 'edit'

interface InvoiceManagementProps {
  initialCustomers: Customer[]
}

export function InvoiceManagement({ initialCustomers }: InvoiceManagementProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  // Deduplicate customers by ID to prevent dropdown issues
  const [customers] = useState<Customer[]>(() => {
    const uniqueCustomers = new Map<string, Customer>()
    initialCustomers.forEach(customer => {
      uniqueCustomers.set(customer.id, customer)
    })
    return Array.from(uniqueCustomers.values())
  })

  const handleAddInvoice = () => {
    setSelectedInvoice(null)
    setViewMode('add')
  }

  const handleEditInvoice = async (invoice: InvoiceListItem) => {
    try {
      const fullInvoice = await getInvoice(invoice.id)
      setSelectedInvoice(fullInvoice)
      setViewMode('edit')
    } catch (error) {
      console.error('Error fetching invoice details:', error)
    }
  }

  const handleViewInvoice = (invoice: InvoiceListItem) => {
    // TODO: Implement invoice detail view
    console.log('View invoice:', invoice)
  }

  const handleDeleteInvoice = async (invoice: InvoiceListItem) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      try {
        await deleteInvoice(invoice.id)
        // Refresh the list by switching back to list view
        setViewMode('list')
      } catch (error) {
        console.error('Error deleting invoice:', error)
      }
    }
  }

  const handleSaveInvoice = async (data: CreateInvoiceInput) => {
    try {
      if (selectedInvoice) {
        await updateInvoice(selectedInvoice.id, data)
      } else {
        await createInvoice(data)
      }

      setViewMode('list')
      setSelectedInvoice(null)
    } catch (error) {
      console.error('Error saving invoice:', error)
      throw error
    }
  }

  const handleCancel = () => {
    setViewMode('list')
    setSelectedInvoice(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Invoices</h1>
        <p className="text-muted-foreground">
          Create and manage your invoices
        </p>
      </div>

      {viewMode === 'list' && (
        <InvoiceList
          onAddInvoice={handleAddInvoice}
          onEditInvoice={handleEditInvoice}
          onViewInvoice={handleViewInvoice}
          onDeleteInvoice={handleDeleteInvoice}
        />
      )}

      {(viewMode === 'add' || viewMode === 'edit') && (
        <InvoiceForm
          invoice={selectedInvoice}
          customers={customers}
          onSave={handleSaveInvoice}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}