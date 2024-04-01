import type { CreatePatientDto, Patient } from "../../domain/entities/patient";
import type { PatientRepository } from "./patient-repository";

export class PatientService {
  constructor(private readonly patientRepository: PatientRepository) {}
  async createPatient(payload: CreatePatientDto) {
    const patientExists = await this.patientRepository.getPatientById(
      payload.cpf
    );

    if (patientExists) {
      throw new Error("Patient already exists");
    }
    return this.patientRepository.createPatient(payload);
  }
  async updatePatient(patient: Patient) {
    return this.patientRepository.updatePatient(patient);
  }
  async deletePatient(id: string) {
    return this.patientRepository.deletePatient(id);
  }
  async getPatientById(id: string) {
    return this.patientRepository.getPatientById(id);
  }
  async getPatients(limit = 20, offset = 0) {
    return this.patientRepository.getPatients({ limit, offset });
  }
}
