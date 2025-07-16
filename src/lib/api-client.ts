/**
 * API Client for consistent fetch operations
 * Centralizes all API calls to avoid duplication
 */

export class ApiClient {
  private static baseHeaders = {
    'Content-Type': 'application/json',
  }

  static async get<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      method: 'GET',
      headers: this.baseHeaders,
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`)
    }

    return response.json()
  }

  static async post<T>(url: string, data: unknown): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      headers: this.baseHeaders,
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Failed to create: ${response.statusText}`)
    }

    return response.json()
  }

  static async put<T>(url: string, data: unknown): Promise<T> {
    const response = await fetch(url, {
      method: 'PUT',
      headers: this.baseHeaders,
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Failed to update: ${response.statusText}`)
    }

    return response.json()
  }

  static async delete(url: string): Promise<void> {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.baseHeaders,
    })

    if (!response.ok) {
      throw new Error(`Failed to delete: ${response.statusText}`)
    }
  }
}