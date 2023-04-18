import { Request, Response } from 'express';
import { PatientService } from '../services';

const patientService = new PatientService();

export const createPatient = async (req: Request, res: Response) => {
  try {
    const patient = await patientService.create(req.body);
    res.status(201).json({ data: patient });
  } catch (error) {
    req.log.error({ error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getPatient = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const patient = await patientService.getByPatientId(id);
    if (!patient) {
      return res.status(400).json({ message: 'Patient not found' });
    }
    res.status(200).json({ data: patient });
  } catch (error) {
    req.log.error({ error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updatePatient = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const patient = await patientService.updateByPatientId(id, req.body);
    if (!patient) {
      return res.status(400).json({ message: 'Patient not found' });
    }
    res.status(200).json({ data: patient });
  } catch (error) {
    req.log.error({ error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getPatients = async (req: Request, res: Response) => {
  try {
    const { limit, cursor } = req.query;
    const pageLimit = Number(limit) || 10;

    const patients = await patientService.getPatients(
      pageLimit,
      cursor as string
    );

    const more = patients?.length === pageLimit + 1;

    if (!more) {
      return res
        .status(200)
        .json({ data: patients, paging: { more, nextCursor: null } });
    }

    const nextCursorRecord = patients[patients.length]._id;
    res
      .status(200)
      .json({ data: patients, paging: { more, nextCursor: nextCursorRecord } });
  } catch (error) {
    req.log.error({ error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deletePatient = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const patient = await patientService.deleteByPatientId(id);
    if (!patient) {
      return res.status(400).json({ message: 'Patient not found' });
    }
    res.status(200).json({ data: 'success' });
  } catch (error) {
    req.log.error({ error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
