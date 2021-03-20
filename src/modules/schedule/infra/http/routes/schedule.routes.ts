import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticate from '@modules/users/infra/http/middlewares/authenticated';
import ScheduleController from '../controllers/ScheduleController';

const scheduleController = new ScheduleController();
const scheduleRouter = Router();

scheduleRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
      patient_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  ensureAuthenticate,
  scheduleController.create,
);
scheduleRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  ensureAuthenticate,
  scheduleController.show,
);
scheduleRouter.get(
  '/',
  ensureAuthenticate,
  scheduleController.showScheduleByUser,
);
scheduleRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      user_id: Joi.string().uuid(),
      patient_id: Joi.string().uuid(),
      date: Joi.date(),
      note: Joi.string(),
    },
  }),
  ensureAuthenticate,
  scheduleController.update,
);
scheduleRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  ensureAuthenticate,
  scheduleController.delete,
);

export default scheduleRouter;
