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

  async updateByPatientId(
    id: string,
    medication: Partial<Medication>
  ): Promise<(Medication & { _id: MongoID }) | null | undefined> {
    const updatedMedication = await this.medicationDao.update(id, medication);
    return updatedMedication;
  }

  async deleteByPatientId(
    id: string
  ): Promise<(Medication & { _id: MongoID }) | null | undefined> {
    const deletedMedication = await this.medicationDao.delete(id);
    return deletedMedication;
  }
}
