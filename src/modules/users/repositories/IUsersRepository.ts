import User from '../infra/typeorm/entities/User';
import IcreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  delete(id: string): Promise<void>;
  create(data: IcreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
