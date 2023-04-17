import mongoose from 'mongoose';
import { Logger } from 'pino';
import { MedicalDataAccessObject, Medication, MongoID } from '../types';
import { logger } from '../services';
import { MedicationModel } from '../models';

export class MedicationDao implements MedicalDataAccessObject<Medication> {
  private medication: mongoose.Model<Medication>;
  private logger: Logger;

  constructor() {
    this.logger = logger.child({ module: 'MedicationDao' });
    this.medication = MedicationModel;
  }

  async create(
    data: Medication
  ): Promise<(Medication & { _id: MongoID }) | undefined> {
    try {
      const newMedication = await this.medication.create(data);
      return newMedication;
    } catch (error) {
      this.logger.error('Failed to create medication', { error });
    }
  }

  async update(
    id: string,
    data: Partial<Medication>
  ): Promise<(Medication & { _id: MongoID }) | null | undefined> {
    try {
      const updatedMedication = await this.medication.findOneAndUpdate(
        { patientId: id },
        data,
        { new: true }
      );
      return updatedMedication;
    } catch (error) {
      this.logger.error('Failed to update medication', { error });
    }
  }

  async getAll(
    id: string,
    limit: number,
    cursor?: string | undefined
  ): Promise<(Medication & { _id: MongoID; createdAt: Date })[] | undefined> {
    try {
      let data;

      if (cursor) {
        data = await this.medication
          .find({
            patientId: id,
            _id: {
              $lte: cursor
            }
          })
          .sort({ createdAt: -1 })
          .limit(limit + 1);
        return data;
      }

      data = await this.medication
        .find()
        .sort({ createdAt: -1 })
        .limit(limit + 1);
      return data;
    } catch (error) {
      this.logger.error('Failed to get all medication', { error });
    }
  }

  async delete(
    id: string
  ): Promise<(Medication & { _id: MongoID }) | null | undefined> {
    try {
      const deletedMedication = await this.medication.findOneAndDelete({
        patientId: id
      });
      return deletedMedication;
    } catch (error) {
      this.logger.error('Failed to delete medication', { error });
    }
  }
}
