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
  create(patient: Patient): Promise<Patient | undefined>;
  getByPatientId(patientId: string): Promise<Patient | null | undefined>;
  updateByPatientId(
    id: string,
    patient: Partial<Patient>
  ): Promise<Patient | null | undefined>;
  getPatients(limit: string, cursor?: string): Promise<Patient[]>;
  deleteByPatientId(patientId: string): Promise<Patient | null | undefined>;
}

export interface IMedicationService {
  create(medication: Medication): Promise<Medication | undefined>;
  getMedicationsByPatientId(
    id: string,
    limit: string,
    cursor?: string
  ): Promise<Medication[] | null | undefined>;
  updateByPatientId(
    id: string,
    medication: Partial<Medication>
  ): Promise<Medication | null | undefined>;
  deleteByPatientId(id: string): Promise<Medication | null | undefined>;
}

export interface IMedicalHistoryService {
  create(medicalHistory: MedicalHistory): Promise<MedicalHistory | undefined>;
  getMedicalHistoriesByPatientId(
    id: string,
    limit: string,
    cursor?: string
  ): Promise<MedicalHistory[] | null | undefined>;
  updateByPatientId(
    id: string,
    medicalHistory: Partial<MedicalHistory>
  ): Promise<MedicalHistory | null | undefined>;
  deleteByPatientId(id: string): Promise<MedicalHistory | null | undefined>;
}
