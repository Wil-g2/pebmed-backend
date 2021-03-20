import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticate from '@modules/users/infra/http/middlewares/authenticated';
import PatientController from '../controllers/PatientController';

const patientController = new PatientController();
const patientRouter = Router();

patientRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      birth_date: Joi.date().required(),
      gender: Joi.number().required().default(1),
      height: Joi.number().required().greater(0),
      weight: Joi.number().required().greater(0),
    },
  }),
  ensureAuthenticate,
  patientController.create,
);
patientRouter.get('/', ensureAuthenticate, patientController.index);

patientRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticate,
  patientController.show,
);
patientRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      birth_date: Joi.date().required(),
      gender: Joi.number().required().default(1),
      height: Joi.number().required().greater(0),
      weight: Joi.number().required().greater(0),
    },
  }),
  ensureAuthenticate,
  patientController.update,
);
patientRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticate,
  patientController.delete,
);

export default patientRouter;
