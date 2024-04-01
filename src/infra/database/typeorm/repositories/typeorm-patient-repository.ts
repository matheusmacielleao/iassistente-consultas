import { Repository } from "typeorm";
import type { PatientRepository } from "../../../../core/application/patient/patient-repository";
import { type Patient } from "../../../../core/domain/entities/patient";
import { PatientModel } from "../models/patient.model";

export class TypeOrmPatientRepository implements PatientRepository {
  constructor(private readonly repo: Repository<PatientModel>) {}
  async createPatient(patient: Patient): Promise<Patient> {
    await this.repo.save(patient);
    return patient;
  }
  updatePatient(patient: Patient): Promise<Patient> {
    throw new Error("Method not implemented.");
  }
  deletePatient(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getPatientById(id: string): Promise<Patient | undefined> {
    const patient = await this.repo.findOne({ where: { cpf: id } });
    if (patient !== null) return patient;
    return undefined;
  }
  async getPatients({ limit = 20, offset = 0 }): Promise<Patient[]> {
    const patients = await this.repo.find({
      take: limit,
      skip: offset * limit,
    });
    return patients;
  }
}
