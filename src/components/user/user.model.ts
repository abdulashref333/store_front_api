import { BaseModelRepository } from '../base/base.model';
import { ICreateUser, IUser, IUserSerialized } from './user.interfaces';

class User extends BaseModelRepository<IUser> {
  async findOneById(id: number): Promise<IUserSerialized | null> {
    return await this.findOne({ id }, ['id', 'firstname', 'lastname', 'email', 'created_at']);
  }

  async findOneByEmail(email: string): Promise<IUser | null> {
    return await this.findOne({ email }, ['id', 'firstname', 'lastname', 'email', 'password']);
  }

  async createUser(obj: Omit<IUser, 'id' | 'created_at'>): Promise<IUser | null> {
    return await this.create(obj);
  }

  async updateUser(id: number, obj: Omit<IUser, 'id' | 'created_at'>): Promise<IUser | null> {
    return await this.update({ id }, obj);
  }
}

export default new User('users');
