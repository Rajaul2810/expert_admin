"use client"

import { useState, useEffect, useCallback } from "react"
import { get } from "@/lib/api-client"

type UseGetOptions = {
  enabled?: boolean
}

export function useGet<T = unknown>(
  url: string | null,
  options: UseGetOptions = {}
): {
  data: T | null
  error: Error | null
  isLoading: boolean
  isError: boolean
  refetch: () => Promise<void>
} {
  const { enabled = true } = options
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(Boolean(url && enabled))

  const fetchData = useCallback(async () => {
    if (!url) {
      setData(null)
      setError(null)
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const result = await get<T>(url)
      setData(result)
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)))
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }, [url])

  useEffect(() => {
    if (!url || !enabled) {
      if (!url) {
        setData(null)
        setError(null)
      }
      setIsLoading(false)
      return
    }
    fetchData()
  }, [url, enabled, fetchData])

  return {
    data,
    error,
    isLoading,
    isError: error !== null,
    refetch: fetchData,
  }
}
