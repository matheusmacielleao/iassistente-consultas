import type { CreateAppointmentDto } from "../../domain/entities/appointment";
import type { Patient } from "../../domain/entities/patient";
import type { PatientService } from "../patient/patient-service";
import type { AppointmentRepository } from "./appointment-repository";

export class AppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly patientService: PatientService
  ) {}

  async createAppointment(payload: CreateAppointmentDto) {
    const patient: Patient | undefined =
      await this.patientService.getPatientById(payload.patientCpf);

    if (!patient) {
      throw new Error("Patient not found");
    }
    return this.appointmentRepository.createAppointment({
      patient,
      ...payload,
    });
  }

  async getAppointments({ offset, limit }: { offset: number; limit: number }) {
    return this.appointmentRepository.getAppointments({ offset, limit });
  }

  async getAppointmentById(id: string) {
    return this.appointmentRepository.getAppointmentById(id);
  }

  async getAppointmentsByPatientId(patientId: string) {
    return this.appointmentRepository.getAppointmentsByPatientId(patientId);
  }
}
