import 'reflect-metadata';

import express, { Express, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import { isCelebrateError } from 'celebrate';

import createConnection from '@shared/infra/typeorm';
import AppError from '../../errors/AppError';

import routes from './routes';
import '@shared/container';

class App {
  public server: Express;

  constructor() {
    this.server = express();

    createConnection();
    this.middleware();
    this.routes();
  }

  middleware(): void {
    this.server.use(express.json());

    this.server.use(cors());

    this.server.use(helmet());
  }

  routes(): void {
    this.server.use(routes);

    this.server.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (isCelebrateError(err)) {
          const errorBody = err.details?.get('body');

          return response.status(400).json({
            statusCode: 400,
            message: errorBody.details,
          });
        }

        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            keyError: err.keyError,
          });
        }

        return response.status(500).json({
          status: 'error',
          message: 'Internal server error',
          keyError: 'error-api:server-error',
        });
      },
    );
  }
}

export default new App().server;
