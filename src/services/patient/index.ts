import { PatientDao } from '../../dao';
import { v4 as uuidV4 } from 'uuid';
import {
  DataAccessObject,
  IPatientService,
  MongoID,
  Patient
} from '../../types';

export class PatientService implements IPatientService {
  private patientDao: DataAccessObject<Patient>;

  constructor() {
    this.patientDao = new PatientDao();
  }

  async create(
    patient: Patient
  ): Promise<(Patient & { _id: MongoID }) | undefined> {
    const patientId = uuidV4();
    const newPatient = await this.patientDao.create({ ...patient, patientId });
    return newPatient;
  }

  async getByPatientId(
    patientId: string
  ): Promise<(Patient & { _id: MongoID }) | null | undefined> {
    const patient = await this.patientDao.get({ patientId });
    return patient;
  }

  async getPatients(
    limit: number,
    cursor?: string | undefined
  ): Promise<(Patient & { _id: MongoID }[]) | undefined> {
    const patients = await this.patientDao.getAll(limit, cursor);
    return patients;
  }

  async updateByPatientId(
    id: string,
    patient: Partial<Patient>
  ): Promise<(Patient & { _id: MongoID }) | null | undefined> {
    const updatedPatient = await this.patientDao.update(id, patient);
    return updatedPatient;
  }

  async deleteByPatientId(
    patientId: string
  ): Promise<(Patient & { _id: MongoID }) | null | undefined> {
    const deletedPatient = await this.patientDao.delete(patientId);
    return deletedPatient;
  }
}
