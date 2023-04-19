import { Router } from 'express';
import passport from 'passport';
import {
  createMedication,
  deleteMedication,
  getMedications,
  updateMedication
} from '../controllers';
import { validateRequestBody } from '../middleware';
import { medicationSchema } from '../utils';

const medicationRouter = Router();

medicationRouter.use(passport.authenticate('jwt', { session: false }));

medicationRouter.post(
  '/',
  validateRequestBody(medicationSchema),
  createMedication
);

medicationRouter.get('/:patientId', getMedications);

medicationRouter.patch('/:patientId', updateMedication);

medicationRouter.delete('/:id', deleteMedication);

export { medicationRouter };
