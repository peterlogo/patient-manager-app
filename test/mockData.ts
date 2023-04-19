import { MedicalHistory, Medication, Patient } from '../src/types';

export const patient: Patient = {
  patientId: '123',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1990-01-01',
  email: 'john.doe@example.com',
  phoneNumber: '1234567890',
  address: {
    street: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94107'
  }
};

export const medicalHistory: MedicalHistory = {
  patientId: '123',
  condition: 'Asthma',
  diagnosedDate: '1997-01-01'
};

export const medication: Medication = {
  patientId: '123',
  name: 'Test Medication',
  dosage: '10mg',
  frequency: 'once daily'
};
