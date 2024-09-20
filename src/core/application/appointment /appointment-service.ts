import type {
  Appointment,
  CreateAppointmentDto,
} from "../../domain/entities/appointment";
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
      ...payload,
      patient,
      notes: payload.notes.map((note) => ({ note } as any)),
    });
  }

  async getAppointments({ offset, limit }: { offset: number; limit: number }) {
    return this.appointmentRepository.getAppointments({ offset, limit });
  }

  async getAppointmentsByPatientId(patientId: string) {
    return this.appointmentRepository.getAppointmentsByPatientId(patientId);
  }
  async updateAppointment(id: string, payload: any) {
    return this.appointmentRepository.updateAppointment({
      ...payload,
      notes: payload.notes.map((note: any) => ({ note } as any)),
      id,
    });
  }
  async deleteAppointment(id: string) {
    return this.appointmentRepository.deleteAppointment(id);
  }
  async getAppointmentById(id: string): Promise<Appointment | undefined> {
    return this.appointmentRepository.getAppointmentById(id);
  }
}
