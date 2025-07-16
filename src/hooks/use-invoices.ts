"use client"

import { useState, useEffect, useCallback } from 'react'
import { InvoiceListItem } from '@/types/invoice'
import { ApiClient } from '@/lib/api-client'

export function useInvoices(search?: string) {
  const [invoices, setInvoices] = useState<InvoiceListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Extract common fetch logic to avoid duplication
  const fetchInvoicesData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const url = new URL('/api/invoices', window.location.origin)
      if (search) {
        url.searchParams.set('search', search)
      }
      
      const data = await ApiClient.get<InvoiceListItem[]>(url.toString())
      setInvoices(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    fetchInvoicesData()
  }, [fetchInvoicesData])

  const refetch = useCallback(() => {
    fetchInvoicesData()
  }, [fetchInvoicesData])

  return {
    invoices,
    loading,
    error,
    refetch
  }
}