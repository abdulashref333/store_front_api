export interface IWriter<T> {
  create(item: Omit<T, 'id' | 'created_at'>): Promise<T | null>;
  createMany(item: Omit<T, 'id'>[]): Promise<T[]>;
  update(id: string, item: Partial<T>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
export interface IReader<T> {
  findAll(item: Partial<T>, select?: string[]): Promise<T[]>;
  findOne(id: string | Partial<T>, select?: string[]): Promise<T | null>;
}
