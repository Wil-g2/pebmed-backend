import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import { classToClass } from 'class-transformer';
import AppError from '@shared/errors/AppError';

export default class UserController {
  async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const showUser = container.resolve(ShowUserService);
      const user = await showUser.execute(id);
      return response.status(200).json(classToClass(user));
    } catch (err) {
      throw new AppError(err.message);
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { full_name, email, password, role } = request.body;

      const createUser = container.resolve(CreateUserService);
      const user = await createUser.execute({
        full_name,
        email,
        password,
        role,
      });

      return response.json(classToClass(user));
    } catch (err) {
      throw new AppError(err.message);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const {
        full_name,
        email,
        password,
        role,
        current_password,
      } = request.body;
      const updateUser = container.resolve(UpdateProfileService);

      const user = await updateUser.execute({
        id,
        full_name,
        email,
        password,
        role,
        current_password,
      });

      return response.status(200).json(classToClass(user));
    } catch (err) {
      throw new AppError(err.message);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const deleteUser = container.resolve(DeleteUserService);
      await deleteUser.execute(id);

      return response.status(204).json();
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
