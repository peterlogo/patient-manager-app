export interface Patient {
    patientId?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    email?: string;
    phoneNumber?: string;
    address?: Address
}

export interface Address {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
}

export interface MedicalHistory {
    patientId?: string;
    condtion?: string;
    diagnosedDate?: string;
}

export interface Medication {
    patientId?: string;
    name?: string;
    dosage?: string;
    frequency?: string;
}
