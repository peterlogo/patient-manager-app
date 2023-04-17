import mongoose, { Schema } from 'mongoose';
import { Medication } from '../types';

const MedicationSchema: Schema = new Schema<Medication>(
  {
    patientId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    dosage: {
      type: String,
      required: true
    },
    frequency: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const MedicationModel: mongoose.Model<Medication> =
  mongoose.model<Medication>('Medication', MedicationSchema);
