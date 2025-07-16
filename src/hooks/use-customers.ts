"use client"

import { useState, useEffect } from 'react'
import { Customer } from '@/types/customer'

export function useCustomers(search?: string) {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const url = new URL('/api/customers', window.location.origin)
        if (search) {
          url.searchParams.set('search', search)
        }
        
        const response = await fetch(url.toString())
        
        if (!response.ok) {
          throw new Error('Failed to fetch customers')
        }
        
        const data = await response.json()
        setCustomers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [search])

  const refetch = () => {
    const fetchCustomers = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const url = new URL('/api/customers', window.location.origin)
        if (search) {
          url.searchParams.set('search', search)
        }
        
        const response = await fetch(url.toString())
        
        if (!response.ok) {
          throw new Error('Failed to fetch customers')
        }
        
        const data = await response.json()
        setCustomers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }

  return {
    customers,
    loading,
    error,
    refetch
  }
}