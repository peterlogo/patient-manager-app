import { Request, Response } from 'express';
import { MedicalHistoryService, PatientService } from '../services';

const medicalHistoryService = new MedicalHistoryService();
const patientService = new PatientService();

export const createHistory = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.body;
    const patientExists = await patientService.getByPatientId(patientId);
    if (!patientExists) {
      return res.status(400).json({ message: 'Patient not found' });
    }
    const medication = await medicalHistoryService.create(req.body);
    res.status(201).json({ data: medication });
  } catch (error) {
    req.log.error({ error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const patientId = req.params.patientId;
    const { limit, cursor } = req.query;

    const pageLimit = parseInt(limit as string, 10) || 10;

    const medicalHistory =
      await medicalHistoryService.getMedicalHistoriesByPatientId(
        patientId,
        pageLimit,
        cursor as string
      );

    const more = medicalHistory?.length === pageLimit + 1;

    if (!more) {
      return res
        .status(200)
        .json({ data: medicalHistory, paging: { more, nextCursor: null } });
    }

    const nextCursorRecord = medicalHistory[medicalHistory.length - 1]._id;
    medicalHistory.pop();

    res.status(200).json({
      data: medicalHistory,
      paging: { more, nextCursor: nextCursorRecord }
    });
  } catch (error) {
    req.log.error({ error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedMedication = await medicalHistoryService.updateById(
      id,
      req.body
    );
    if (!updatedMedication) {
      return res.status(400).json({ message: 'Medical history not found' });
    }
    res.status(200).json({ data: updatedMedication });
  } catch (error) {
    req.log.error({ error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedMedication = await medicalHistoryService.deleteById(id);
    if (!deletedMedication) {
      return res.status(400).json({ message: 'Medication not found' });
    }
    res.status(200).json({ data: 'success' });
  } catch (error) {
    req.log.error({ error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
