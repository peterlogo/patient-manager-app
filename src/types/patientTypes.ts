import mongoose from 'mongoose';
import { MongoID } from './daoTypes';

export interface Patient {
  patientId?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
  phoneNumber?: string;
  address?: Address;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface MedicalHistory {
  patientId?: string;
  condition?: string;
  diagnosedDate?: string;
}

export interface Medication {
  patientId?: string;
  name?: string;
  dosage?: string;
  frequency?: string;
}

export interface IPatientService {
  create(patient: Patient): Promise<(Patient & { _id: MongoID }) | undefined>;
  getByPatientId(
    patientId: string
  ): Promise<(Patient & { _id: MongoID }) | null | undefined>;
  updateByPatientId(
    id: string,
    patient: Partial<Patient>
  ): Promise<(Patient & { _id: MongoID }) | null | undefined>;
  getPatients(
    limit: number,
    cursor?: string
  ): Promise<(Patient & { _id: MongoID }[]) | undefined>;
  deleteByPatientId(
    patientId: string
  ): Promise<(Patient & { _id: MongoID }) | null | undefined>;
}

export interface IMedicationService {
  create(
    medication: Medication
  ): Promise<(Medication & { _id: MongoID }) | undefined>;
  getMedicationsByPatientId(
    id: string,
    limit: number,
    cursor?: string
  ): Promise<(Medication & { _id: MongoID }[]) | null | undefined>;
  updateByPatientId(
    id: string,
    medication: Partial<Medication>
  ): Promise<(Medication & { _id: MongoID }) | null | undefined>;
  deleteByPatientId(
    id: string
  ): Promise<(Medication & { _id: MongoID }) | null | undefined>;
  deleteAllMedications(
    id: string
  ): Promise<mongoose.mongo.DeleteResult | undefined>;
}

export interface IMedicalHistoryService {
  create(
    medicalHistory: MedicalHistory
  ): Promise<(MedicalHistory & { _id: MongoID }) | undefined>;
  getMedicalHistoriesByPatientId(
    id: string,
    limit: number,
    cursor?: string
  ): Promise<(MedicalHistory & { _id: MongoID }[]) | null | undefined>;
  updateByPatientId(
    id: string,
    medicalHistory: Partial<MedicalHistory>
  ): Promise<(MedicalHistory & { _id: MongoID }) | null | undefined>;
  deleteByPatientId(
    id: string
  ): Promise<(MedicalHistory & { _id: MongoID }) | null | undefined>;
  deleteAllMedicalHistories(
    id: string
  ): Promise<mongoose.mongo.DeleteResult | undefined>;
}
