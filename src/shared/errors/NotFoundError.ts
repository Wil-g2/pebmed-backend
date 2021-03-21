import AppError from './AppError';

class NotFoundError extends AppError {
  constructor(name = '') {
    super(
      `${name} does not exist`,
      404,
      `error-api:${name.toLowerCase()}-not-exist`,
    );
  }
}

export default NotFoundError;
