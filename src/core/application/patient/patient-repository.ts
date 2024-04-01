import type { Patient } from "../../domain/entities/patient";

export interface PatientRepository {
  createPatient(patient: Patient): Promise<Patient>;
  updatePatient(patient: Patient): Promise<Patient>;
  deletePatient(id: string): Promise<void>;
  getPatientById(id: string): Promise<Patient | undefined>;
  getPatients({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }): Promise<Patient[]>;
}
