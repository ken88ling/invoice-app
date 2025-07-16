import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { InvoiceService } from '@/services/invoice.service'
import { updateInvoiceSchema } from '@/lib/validations/invoice'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const invoice = await InvoiceService.getInvoice(id)
    return NextResponse.json(invoice)
  } catch (error) {
    if (error instanceof Error && error.message === 'Invoice not found') {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      )
    }

    console.error('Error fetching invoice:', error)
    return NextResponse.json(
      { error: 'Failed to fetch invoice' },
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
    
    // Parse dates from strings if they exist
    const parsedBody = {
      ...body,
      ...(body.issueDate && { issueDate: new Date(body.issueDate) }),
      ...(body.dueDate && { dueDate: new Date(body.dueDate) }),
    }
    
    const validatedData = updateInvoiceSchema.parse(parsedBody)

    const invoice = await InvoiceService.updateInvoice(id, validatedData)

    return NextResponse.json(invoice)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    if (error instanceof Error) {
      if (error.message === 'Invoice not found') {
        return NextResponse.json(
          { error: 'Invoice not found' },
          { status: 404 }
        )
      }
      
      if (error.message === 'Customer not found') {
        return NextResponse.json(
          { error: 'Customer not found' },
          { status: 400 }
        )
      }
    }

    console.error('Error updating invoice:', error)
    return NextResponse.json(
      { error: 'Failed to update invoice' },
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
    await InvoiceService.deleteInvoice(id)
    return NextResponse.json({ message: 'Invoice deleted successfully' })
  } catch (error) {
    if (error instanceof Error && error.message === 'Invoice not found') {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      )
    }

    console.error('Error deleting invoice:', error)
    return NextResponse.json(
      { error: 'Failed to delete invoice' },
      { status: 500 }
    )
  }
}