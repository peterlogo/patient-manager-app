import { mongo } from 'mongoose';
import { MedicationDao } from '../../dao';
import {
  IMedicationService,
  MedicalDataAccessObject,
  Medication,
  MongoID
} from '../../types';

export class MedicationService implements IMedicationService {
  private medicationDao: MedicalDataAccessObject<Medication>;

  constructor() {
    this.medicationDao = new MedicationDao();
  }

  async create(
    medication: Medication
  ): Promise<(Medication & { _id: MongoID }) | undefined> {
    const newMedication = await this.medicationDao.create(medication);
    return newMedication;
  }

  async getMedicationsByPatientId(
    id: string,
    limit: number,
    cursor?: string | undefined
  ): Promise<(Medication & { _id: MongoID }[]) | null | undefined> {
    const medications = await this.medicationDao.getAll(id, limit, cursor);
    return medications;
  }

  async updateById(
    id: string,
    medication: Partial<Medication>
  ): Promise<(Medication & { _id: MongoID }) | null | undefined> {
    const updatedMedication = await this.medicationDao.update(id, medication);
    return updatedMedication;
  }

  async deleteById(
    id: string
  ): Promise<(Medication & { _id: MongoID }) | null | undefined> {
    const deletedMedication = await this.medicationDao.delete(id);
    return deletedMedication;
  }

  async deleteAllMedications(
    id: string
  ): Promise<mongo.DeleteResult | undefined> {
    const response = await this.medicationDao.deleteAll(id);
    return response;
  }
}
