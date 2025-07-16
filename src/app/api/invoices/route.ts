import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { InvoiceService } from '@/services/invoice.service'
import { createInvoiceSchema } from '@/lib/validations/invoice'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || undefined
    
    const invoices = await InvoiceService.getInvoices(search)

    return NextResponse.json(invoices)
  } catch (error) {
    console.error('Error fetching invoices:', error)
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Parse dates from strings
    const parsedBody = {
      ...body,
      issueDate: new Date(body.issueDate),
      dueDate: new Date(body.dueDate),
    }
    
    const validatedData = createInvoiceSchema.parse(parsedBody)

    const invoice = await InvoiceService.createInvoice(validatedData)

    return NextResponse.json(invoice, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    if (error instanceof Error) {
      if (error.message === 'Customer not found') {
        return NextResponse.json(
          { error: 'Customer not found' },
          { status: 400 }
        )
      }
    }

    console.error('Error creating invoice:', error)
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    )
  }
}