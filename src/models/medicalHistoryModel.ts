import mongoose, { Schema } from 'mongoose';
import { MedicalHistory } from '../types';

const MedicalHistorySchema: Schema = new Schema<MedicalHistory>(
  {
    patientId: {
      type: String,
      required: true
    },
    condition: {
      type: String,
      required: true
    },
    diagnosedDate: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const MedicalHistoryModel: mongoose.Model<MedicalHistory> =
  mongoose.model<MedicalHistory>('MedicalHistory', MedicalHistorySchema);
