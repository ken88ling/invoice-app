export interface FindManyOptions {
  search?: string
  limit?: number
  offset?: number
  orderBy?: Record<string, 'asc' | 'desc'>
}

export abstract class BaseRepository<T> {
  abstract findMany(options?: FindManyOptions): Promise<T[]>
  abstract findUnique(id: string): Promise<T | null>
  abstract create(data: unknown): Promise<T>
  abstract update(id: string, data: unknown): Promise<T>
  abstract delete(id: string): Promise<void>
}