import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SessionUserService from '@modules/users/services/SessionUserService';
import { classToClass } from 'class-transformer';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const sessionUser = container.resolve(SessionUserService);

    const { user, token } = await sessionUser.execute({ email, password });

    return response.json({ user: classToClass(user), token });
  }
}
