"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { InvoiceListItem } from '@/types/invoice'
import { useInvoices } from '@/hooks/use-invoices'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/formatters'
import { LoadingSpinner } from '@/components/common/loading-spinner'
import { ErrorDisplay } from '@/components/common/error-display'
import { StatusBadge } from '@/components/common/status-badge'

interface InvoiceListProps {
  onAddInvoice: () => void
  onEditInvoice: (invoice: InvoiceListItem) => void
  onViewInvoice: (invoice: InvoiceListItem) => void
  onDeleteInvoice: (invoice: InvoiceListItem) => void
}

export function InvoiceList({ 
  onAddInvoice, 
  onEditInvoice, 
  onViewInvoice,
  onDeleteInvoice 
}: InvoiceListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const { invoices, loading, error } = useInvoices(debouncedSearchTerm)

  // Debounce search term to prevent focus loss
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500) // 500ms delay
    
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchTerm])

  const getPaymentStatus = (invoice: InvoiceListItem) => {
    if (invoice.paidAmount >= invoice.total) {
      return 'Paid'
    } else if (invoice.paidAmount > 0) {
      return 'Partial'
    } else {
      return 'Unpaid'
    }
  }

  if (loading) {
    return <LoadingSpinner text="Loading invoices..." withCard />
  }

  if (error) {
    return <ErrorDisplay error={error} withCard />
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={onAddInvoice}>
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoices ({invoices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? 'No invoices found matching your search.' : 'No invoices yet. Create your first invoice to get started.'}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <div className="font-medium">{invoice.number}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{invoice.customer.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {invoice.customer.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDate(invoice.issueDate)}
                    </TableCell>
                    <TableCell>
                      {formatDate(invoice.dueDate)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={invoice.status} />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {formatCurrency(invoice.total)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{getPaymentStatus(invoice)}</div>
                        {invoice.paidAmount > 0 && (
                          <div className="text-muted-foreground">
                            {formatCurrency(invoice.paidAmount)} of {formatCurrency(invoice.total)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onViewInvoice(invoice)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEditInvoice(invoice)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDeleteInvoice(invoice)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}