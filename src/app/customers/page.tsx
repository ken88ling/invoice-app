"use client"

import { useState } from 'react'
import { MainLayout } from "@/components/layout/main-layout"
import { Customer } from '@/types/customer'
import { CreateCustomerInput } from '@/lib/validations/customer'
import { CustomerList } from '@/components/customers/customer-list'
import { CustomerForm } from '@/components/customers/customer-form'

type ViewMode = 'list' | 'add' | 'edit'

export default function CustomersPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const handleAddCustomer = () => {
    setSelectedCustomer(null)
    setViewMode('add')
  }

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setViewMode('edit')
  }

  const handleViewCustomer = (customer: Customer) => {
    // TODO: Implement customer detail view
    console.log('View customer:', customer)
  }

  const handleSaveCustomer = async (data: CreateCustomerInput) => {
    try {
      const url = selectedCustomer 
        ? `/api/customers/${selectedCustomer.id}`
        : '/api/customers'
      
      const method = selectedCustomer ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to save customer')
      }

      setViewMode('list')
      setSelectedCustomer(null)
    } catch (error) {
      console.error('Error saving customer:', error)
      throw error
    }
  }

  const handleCancel = () => {
    setViewMode('list')
    setSelectedCustomer(null)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-muted-foreground">
            Manage your customer database
          </p>
        </div>

        {viewMode === 'list' && (
          <CustomerList
            onAddCustomer={handleAddCustomer}
            onEditCustomer={handleEditCustomer}
            onViewCustomer={handleViewCustomer}
          />
        )}

        {(viewMode === 'add' || viewMode === 'edit') && (
          <CustomerForm
            customer={selectedCustomer}
            onSave={handleSaveCustomer}
            onCancel={handleCancel}
          />
        )}
      </div>
    </MainLayout>
  )
}