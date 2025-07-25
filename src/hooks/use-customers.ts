"use client"

import { useState, useEffect, useCallback } from 'react'
import { Customer } from '@/types/customer'
import { ApiClient } from '@/lib/api-client'

export function useCustomers(search?: string) {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Extract common fetch logic to avoid duplication
  const fetchCustomersData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const url = new URL('/api/customers', window.location.origin)
      if (search) {
        url.searchParams.set('search', search)
      }
      
      const data = await ApiClient.get<Customer[]>(url.toString())
      setCustomers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    fetchCustomersData()
  }, [fetchCustomersData])

  const refetch = useCallback(() => {
    fetchCustomersData()
  }, [fetchCustomersData])

  return {
    customers,
    loading,
    error,
    refetch
  }
}