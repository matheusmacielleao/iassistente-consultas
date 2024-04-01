interface Patient {
  cpf: string;
  name: string;
  birthDate: Date;
  gender: string;
  profission: string;
  allergies: string[];
  comorbidities: string[];
  continuosMedications: string[];
}

interface CreatePatientDto {
  cpf: string;
  name: string;
  birthDate: Date;
  gender: string;
  profission: string;
  allergies: string[];
  comorbidities: string[];
  continuosMedications: string[];
}
export type { Patient, CreatePatientDto };
