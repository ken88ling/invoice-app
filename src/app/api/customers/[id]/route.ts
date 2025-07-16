import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { CustomerService } from '@/services/customer.service'
import { updateCustomerSchema } from '@/lib/validations/customer'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const customer = await CustomerService.getCustomer(id)
    return NextResponse.json(customer)
  } catch (error) {
    if (error instanceof Error && error.message === 'Customer not found') {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      )
    }

    console.error('Error fetching customer:', error)
    return NextResponse.json(
      { error: 'Failed to fetch customer' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = updateCustomerSchema.parse(body)

    const customer = await CustomerService.updateCustomer(id, validatedData)

    return NextResponse.json(customer)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    if (error instanceof Error && error.message === 'Customer not found') {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      )
    }

    console.error('Error updating customer:', error)
    return NextResponse.json(
      { error: 'Failed to update customer' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await CustomerService.deleteCustomer(id)
    return NextResponse.json({ message: 'Customer deleted successfully' })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Customer not found') {
        return NextResponse.json(
          { error: 'Customer not found' },
          { status: 404 }
        )
      }
      
      if (error.message === 'Cannot delete customer with existing invoices') {
        return NextResponse.json(
          { error: 'Cannot delete customer with existing invoices' },
          { status: 400 }
        )
      }
    }

    console.error('Error deleting customer:', error)
    return NextResponse.json(
      { error: 'Failed to delete customer' },
      { status: 500 }
    )
  }
}