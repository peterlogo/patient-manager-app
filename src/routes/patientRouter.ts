import { Router } from 'express';
import passport from 'passport';
import {
  createPatient,
  deletePatient,
  getPatient,
  getPatients,
  updatePatient
} from '../controllers';
import { validateRequestBody } from '../middleware';
import { patientSchema } from '../utils';

const patientRouter = Router();

patientRouter.use(passport.authenticate('jwt', { session: false }));

patientRouter.post('/', validateRequestBody(patientSchema), createPatient);

patientRouter.patch(
  '/:id',
  validateRequestBody(patientSchema.partial()),
  updatePatient
);

patientRouter.get('/:id', getPatient);

patientRouter.get('/', getPatients);

patientRouter.delete('/:patientId', deletePatient);

export { patientRouter };
