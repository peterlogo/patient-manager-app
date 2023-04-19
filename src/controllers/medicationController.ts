import { Request, Response } from 'express';
import { MedicationService, PatientService } from '../services';

const medicationService = new MedicationService();
const patientService = new PatientService();

export const createMedication = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.body;
    const patientExists = await patientService.getByPatientId(patientId);
    if (!patientExists) {
      return res.status(400).json({ message: 'Patient not found' });
    }
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

    const pageLimit = parseInt(limit as string, 10) || 10;

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

    const nextCursorRecord = medications[medications.length - 1]._id;
    medications.pop();

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
  try {
    const { id } = req.params;
    const updatedMedication = await medicationService.updateById(id, req.body);
    if (!updatedMedication) {
      return res.status(400).json({ message: 'Medication not found' });
    }
    res.status(200).json({ data: updatedMedication });
  } catch (error) {
    req.log.error({ error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteMedication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedMedication = await medicationService.deleteById(id);
    if (!deletedMedication) {
      return res.status(400).json({ message: 'Medication not found' });
    }
    res.status(200).json({ data: 'success' });
  } catch (error) {
    req.log.error({ error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
