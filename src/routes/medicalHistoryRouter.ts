import { Router } from 'express';
import passport from 'passport';
import { validateRequestBody } from '../middleware';
import { medicalHistorySchema } from '../utils';
import {
  createHistory,
  deleteHistory,
  getHistory,
  updateHistory
} from '../controllers';

const medicalHistoryRouter = Router();

medicalHistoryRouter.use(passport.authenticate('jwt', { session: false }));

medicalHistoryRouter.post(
  '/',
  validateRequestBody(medicalHistorySchema),
  createHistory
);

medicalHistoryRouter.get('/:patientId', getHistory);

medicalHistoryRouter.patch(
  '/:id',
  validateRequestBody(medicalHistorySchema.partial()),
  updateHistory
);

medicalHistoryRouter.delete('/:id', deleteHistory);

export { medicalHistoryRouter };
