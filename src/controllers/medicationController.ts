import { Request, Response } from 'express';
import { MedicationService } from '../services';

const medicationService = new MedicationService();

export const createMedication = async (req: Request, res: Response) => {
  try {
    const medication = await medicationService.create(req.body);
    res.status(201).json({ data: medication });
  } catch (error) {
    req.log.error({ error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getMedications = async (req: Request, res: Response) => {
  try {
    const patientId = req.params.patientId;
    const { limit, cursor } = req.query;
    const pageLimit = Number(limit) || 10;

    const medications = await medicationService.getMedicationsByPatientId(
      patientId,
      pageLimit,
      cursor as string
    );

    const more = medications?.length === pageLimit + 1;

    if (!more) {
      return res
        .status(200)
        .json({ data: medications, paging: { more, nextCursor: null } });
    }

    const nextCursorRecord = medications[medications.length]._id;
    res.status(200).json({
      data: medications,
      paging: { more, nextCursor: nextCursorRecord }
    });
  } catch (error) {
    req.log.error({ error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateMedication = async (req: Request, res: Response) => {
  //
};

export const deleteMedication = async (req: Request, res: Response) => {
  //
};
