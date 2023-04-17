import zod from 'zod';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to validate the request parameters against a schema.
 * @param schema
 * @returns
 */
export const validateRequestParams =
  (schema: zod.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Request params: ', req.params);
      const validateData = schema.parse(req.params);
      if (validateData) next();
    } catch (error) {
      if (error instanceof zod.ZodError) {
        const errors = error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message
        }));
        return res.status(400).json({ message: 'Validation failed', errors });
      } else {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  };
