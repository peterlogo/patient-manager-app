import mongoose, { mongo } from 'mongoose';
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
      const updatedMedication = await this.medication.findByIdAndUpdate(
        { _id: id },
        data,
        { new: true }
      );
      return updatedMedication;
    } catch (error) {
      this.logger.error('Failed to update medication', { error });
    }
  }

  async getAll(
    patientId: string,
    limit: number,
    cursor?: string | undefined
  ): Promise<(Medication & { _id: MongoID; createdAt: Date })[] | undefined> {
    try {
      let data;

      if (cursor) {
        data = await this.medication
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

      data = await this.medication
        .find({ patientId })
        .sort({ createdAt: -1 })
        .limit(limit + 1);
      return data;
    } catch (error) {
      this.logger.error('Failed to get all medications', { error });
    }
  }

  async delete(
    id: string
  ): Promise<(Medication & { _id: MongoID }) | null | undefined> {
    try {
      const deletedMedication = await this.medication.findOneAndDelete({
        _id: id
      });
      return deletedMedication;
    } catch (error) {
      this.logger.error('Failed to delete medication', { error });
    }
  }

  async deleteAll(patientId: string): Promise<mongo.DeleteResult | undefined> {
    try {
      const deletedMedications = await this.medication.deleteMany({
        patientId
      });
      return deletedMedications;
    } catch (error) {
      this.logger.error('Failed to delete all medications', { error });
    }
  }
}
