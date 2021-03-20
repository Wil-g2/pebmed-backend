import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticate from '@modules/users/infra/http/middlewares/authenticated';
import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const userRouter = Router();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      full_name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
      role: Joi.number().required().default(1),
    },
  }),
  usersController.create,
);

userRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  ensureAuthenticate,
  usersController.show,
);
userRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      full_name: Joi.string().required(),
      email: Joi.string().email().required(),
      birth_date: Joi.date(),
      status: Joi.number(),
      role: Joi.number(),
      current_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  ensureAuthenticate,
  usersController.update,
);
userRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  ensureAuthenticate,
  usersController.delete,
);

export default userRouter;
