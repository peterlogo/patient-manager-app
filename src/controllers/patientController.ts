import { Request, Response } from 'express';
import { PatientService } from '../services';

const patientService = new PatientService();

export const createPatient = async (req: Request, res: Response) => {
  try {
    const patient = await patientService.create(req.body);
    if (patient === undefined) {
      return res.status(400).json({ message: 'Patient not created' });
    }
    res.status(201).json({ data: patient });
  } catch (error) {
    req.log.error({ error });
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getPatient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const patient = await patientService.getById(id);
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
    const { id } = req.params;
    const patient = await patientService.updateById(id, req.body);
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

    console.log({ limit, cursor });

    const pageLimit = parseInt(limit as string, 10) || 10;

    const patients = await patientService.getPatients(
      pageLimit,
      cursor as string
    );

    // console.log('patients: ', patients);

    const more = patients?.length === pageLimit + 1;

    // console.log('more: ', more);

    if (!more) {
      return res
        .status(200)
        .json({ data: patients, paging: { more, nextCursor: null } });
    }

    const nextCursorRecord = patients[patients.length - 1]._id;

    // console.log('nextCursorRecord: ', nextCursorRecord);

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
