import mongoose from 'mongoose';
import { Logger } from 'pino';
import { MedicalDataAccessObject, MedicalHistory, MongoID } from '../types';
import { MedicalHistoryModel } from '../models';
import { logger } from '../services';

export class MedicalHistoryDao
  implements MedicalDataAccessObject<MedicalHistory>
{
  private medicalHistory: mongoose.Model<MedicalHistory>;
  private logger: Logger;

  constructor() {
    this.medicalHistory = MedicalHistoryModel;
    this.logger = logger.child({ module: 'MedicalHistoryDao' });
  }

  async create(
    data: MedicalHistory
  ): Promise<(MedicalHistory & { _id: MongoID }) | undefined> {
    try {
      const newMedicalHistory = await this.medicalHistory.create(data);
      return newMedicalHistory;
    } catch (error) {
      this.logger.error('Failed to create new medical history', { error });
    }
  }

  async get(
    query: Partial<MedicalHistory & { _id: MongoID }>
  ): Promise<(MedicalHistory & { _id: MongoID }) | null | undefined> {
    try {
      const history = await this.medicalHistory.findOne(query);
      return history;
    } catch (error) {
      this.logger.error('Failed to get medical history', { error });
    }
  }

  async update(
    id: string,
    data: Partial<MedicalHistory>
  ): Promise<(MedicalHistory & { _id: MongoID }) | null | undefined> {
    try {
      const updatedHistory = await this.medicalHistory.findOneAndUpdate(
        { _id: id },
        data,
        { new: true }
      );
      return updatedHistory;
    } catch (error) {
      this.logger.error('Failed to update medical history', { error });
    }
  }

  async getAll(
    patientId: string,
    limit: number,
    cursor?: string | undefined
  ): Promise<
    (MedicalHistory & { _id: MongoID; createdAt: Date })[] | undefined
  > {
    try {
      let data;

      if (cursor) {
        data = await this.medicalHistory
          .find({
            patientId,
            _id: {
              $lte: cursor
            }
          })
          .sort({ createdAt: -1 })
          .limit(limit + 1);
        return data;
      }

      data = await this.medicalHistory
        .find()
        .sort({ createdAt: -1 })
        .limit(limit + 1);
      return data;
    } catch (error) {
      this.logger.error('Failed to get all medical histories', { error });
    }
  }

  async delete(
    id: string
  ): Promise<(MedicalHistory & { _id: MongoID }) | null | undefined> {
    try {
      const deletedHistory = await this.medicalHistory.findOneAndDelete({
        _id: id
      });
      return deletedHistory;
    } catch (error) {
      this.logger.error('Failed to delete medical history', { error });
    }
  }

  async deleteAll(
    patientId: string
  ): Promise<mongoose.mongo.DeleteResult | undefined> {
    try {
      const deletedHistory = await this.medicalHistory.deleteMany({
        patientId
      });
      return deletedHistory;
    } catch (error) {
      this.logger.error('Failed to delete all medical histories', { error });
    }
  }
}
