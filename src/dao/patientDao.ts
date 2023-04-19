import mongoose from 'mongoose';
import { Logger } from 'pino';
import { DataAccessObject, MongoID, Patient } from '../types';
import { logger } from '../services';
import { PatientModel } from '../models';

export class PatientDao implements DataAccessObject<Patient> {
  private patient: mongoose.Model<Patient>;
  private logger: Logger;

  constructor() {
    this.logger = logger.child({ module: 'PatientDao' });
    this.patient = PatientModel;
  }

  async create(
    data: Patient
  ): Promise<(Patient & { _id: MongoID }) | undefined> {
    try {
      const newPatient = await this.patient.create(data);
      return newPatient;
    } catch (error) {
      this.logger.error({ error }, 'Failed to create patient');
    }
  }

  async get(
    query: Partial<Patient & { _id: MongoID }>
  ): Promise<(Patient & { _id: MongoID }) | null | undefined> {
    try {
      const patient = await this.patient.findOne(query);
      return patient;
    } catch (error) {
      this.logger.error({ error }, 'Failed to get patient');
    }
  }

  async getAll(
    limit: number,
    cursor?: string | undefined
  ): Promise<(Patient & { _id: MongoID; createdAt: Date })[] | undefined> {
    try {
      let data;

      if (cursor) {
        data = await this.patient
          .find({
            _id: {
              $lte: cursor
            }
          })
          .sort({ createdAt: -1 })
          .limit(limit + 1);
        return data;
      }

      data = await this.patient
        .find()
        .sort({ createdAt: -1 })
        .limit(limit + 1);
      return data;
    } catch (error) {
      this.logger.error({ error }, 'Failed to get patients');
    }
  }

  async update(
    id: string,
    data: Partial<Patient>
  ): Promise<(Patient & { _id: MongoID }) | null | undefined> {
    try {
      const updatedPatient = await this.patient.findOneAndUpdate(
        { _id: id },
        data,
        { new: true }
      );
      return updatedPatient;
    } catch (error) {
      this.logger.error({ error }, 'Failed to update patient');
    }
  }

  async delete(
    id: string
  ): Promise<(Patient & { _id: MongoID }) | null | undefined> {
    try {
      const deletePatient = await this.patient.findOneAndDelete({
        patientId: id
      });
      return deletePatient;
    } catch (error) {
      this.logger.error({ error }, 'Failed to delete patient');
    }
  }
}
