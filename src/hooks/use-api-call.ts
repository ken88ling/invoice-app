"use client"

import { useState, useCallback } from 'react'

interface ApiCallState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseApiCallResult<T, TArgs extends unknown[] = unknown[]> {
  data: T | null
  loading: boolean
  error: string | null
  execute: (...args: TArgs) => Promise<T | null>
  reset: () => void
}

/**
 * Generic hook for API calls with loading, error, and data state management
 * Follows DRY principles by centralizing common API call patterns
 * 
 * @param apiFunction - The async function to execute
 * @param immediate - Whether to execute immediately on mount (default: false)
 * @returns Object with data, loading, error states and execute function
 */
export function useApiCall<T, TArgs extends unknown[] = unknown[]>(
  apiFunction: (...args: TArgs) => Promise<T>,
  immediate: boolean = false,
  immediateArgs?: TArgs
): UseApiCallResult<T, TArgs> {
  const [state, setState] = useState<ApiCallState<T>>({
    data: null,
    loading: immediate,
    error: null,
  })

  const execute = useCallback(
    async (...args: TArgs): Promise<T | null> => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }))
        
        const result = await apiFunction(...args)
        
        setState(prev => ({ 
          ...prev, 
          data: result, 
          loading: false, 
          error: null 
        }))
        
        return result
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred'
        
        setState(prev => ({ 
          ...prev, 
          loading: false, 
          error: errorMessage 
        }))
        
        return null
      }
    },
    [apiFunction]
  )

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    })
  }, [])

  // Execute immediately if requested
  useState(() => {
    if (immediate && immediateArgs) {
      execute(...immediateArgs)
    }
  })

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    execute,
    reset,
  }
}

/**
 * Specialized hook for API calls that return arrays/lists
 * Provides additional utility for list operations
 */
export function useApiList<T, TArgs extends unknown[] = unknown[]>(
  apiFunction: (...args: TArgs) => Promise<T[]>,
  immediate: boolean = false,
  immediateArgs?: TArgs
) {
  const {
    data,
    loading,
    error,
    execute,
    reset,
  } = useApiCall<T[], TArgs>(apiFunction, immediate, immediateArgs)

  return {
    items: data || [],
    count: data?.length || 0,
    loading,
    error,
    execute,
    reset,
    isEmpty: !loading && !error && (data?.length === 0),
  }
}

/**
 * Hook for mutation operations (create, update, delete)
 * Optimized for operations that modify data
 */
export function useMutation<T, TArgs extends unknown[] = unknown[]>(
  mutationFunction: (...args: TArgs) => Promise<T>
) {
  const [state, setState] = useState<ApiCallState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const mutate = useCallback(
    async (...args: TArgs): Promise<T | null> => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }))
        
        const result = await mutationFunction(...args)
        
        setState(prev => ({ 
          ...prev, 
          data: result, 
          loading: false, 
          error: null 
        }))
        
        return result
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred'
        
        setState(prev => ({ 
          ...prev, 
          loading: false, 
          error: errorMessage 
        }))
        
        throw error // Re-throw for caller to handle if needed
      }
    },
    [mutationFunction]
  )

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    })
  }, [])

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    mutate,
    reset,
  }
}