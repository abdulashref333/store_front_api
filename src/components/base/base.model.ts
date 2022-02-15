import { IWriter, IReader } from './base.interfaces';
import { Client } from 'pg';
import Common from '../../utils/common';

type IBaseRepository<T> = IReader<T> & IWriter<T>;

export abstract class BaseModelRepository<T> implements IBaseRepository<T> {
  constructor(public readonly tableName: string) {}

  async findAll(item?: Partial<T>, select?: string[]): Promise<T[]> {
    const result = (await Common.dbFetch(this.tableName, item, select)) as T[];
    return result;
  }
  async findOne(item: Partial<T>, select?: string[]): Promise<T | null> {
    const result = await Common.dbFetch(this.tableName, item, select);
    if (result?.length) {
      return result[0] as T;
    } else {
      return null;
    }
  }

  async create(item: Omit<T, 'id' | 'created_at'>): Promise<T | null> {
    const result = await Common.dbInsert(this.tableName, item);
    if (result?.length) {
      return result[0] as T;
    }
    return null;
  }
  // TODO:
  async createMany(item: Omit<T, 'id'>[]): Promise<T[]> {
    return [] as T[];
  }
  async update(conditions: Partial<T>, item: Partial<T>): Promise<T | null> {
    const result = await Common.dbUpdate(this.tableName, conditions, item);
    if (result) {
      return result[0];
    }
    return null;
  }
  async delete(condition: Partial<T>): Promise<boolean> {
    const result = await Common.dbDeletion(this.tableName, condition);
    if (result) {
      return result;
    }
    return false;
  }
}
