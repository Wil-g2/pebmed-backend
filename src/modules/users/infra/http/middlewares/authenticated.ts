import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
  role: string;
}

export default function authenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('token is missing', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const tokenDecod = verify(token, process.env.SECRET || 'SECRET');

    const { sub, role } = tokenDecod as TokenPayload;

    request.user = {
      id: sub,
      role,
    };

    return next();
  } catch {
    throw new AppError('invalid token', 401);
  }
}
