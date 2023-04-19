import { mongo } from 'mongoose';
import { MedicalHistoryDao } from '../../dao';
import {
  IMedicalHistoryService,
  MedicalDataAccessObject,
  MedicalHistory,
  MongoID
} from '../../types';

export class MedicalHistoryService implements IMedicalHistoryService {
  private medicalHistoryDao: MedicalDataAccessObject<MedicalHistory>;

  constructor() {
    this.medicalHistoryDao = new MedicalHistoryDao();
  }

  async create(
    medicalHistory: MedicalHistory
  ): Promise<(MedicalHistory & { _id: MongoID }) | undefined> {
    const newMedicalHistory = await this.medicalHistoryDao.create(
      medicalHistory
    );
    return newMedicalHistory;
  }

  async getMedicalHistoriesByPatientId(
    id: string,
    limit: number,
    cursor?: string | undefined
  ): Promise<(MedicalHistory & { _id: MongoID }[]) | null | undefined> {
    const medicalHistories = await this.medicalHistoryDao.getAll(
      id,
      limit,
      cursor
    );
    return medicalHistories;
  }

  async updateById(
    id: string,
    medicalHistory: Partial<MedicalHistory>
  ): Promise<(MedicalHistory & { _id: MongoID }) | null | undefined> {
    const updatedMedicalHistory = await this.medicalHistoryDao.update(
      id,
      medicalHistory
    );
    return updatedMedicalHistory;
  }

  async deleteById(
    id: string
  ): Promise<(MedicalHistory & { _id: MongoID }) | null | undefined> {
    const deletedMedicalHistory = await this.medicalHistoryDao.delete(id);
    return deletedMedicalHistory;
  }

  async deleteAllMedicalHistories(
    id: string
  ): Promise<mongo.DeleteResult | undefined> {
    const response = await this.medicalHistoryDao.deleteAll(id);
    return response;
  }
}
