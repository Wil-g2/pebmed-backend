import { Router } from 'express';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import scheduleRouter from '@modules/schedule/infra/http/routes/schedule.routes';
import patientRouter from '@modules/patient/infra/http/routes/patient.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/patients', patientRouter);
routes.use('/users', userRouter);
routes.use('/schedules', scheduleRouter);

export default routes;
