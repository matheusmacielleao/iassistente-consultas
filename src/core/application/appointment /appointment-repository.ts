import type {
  Appointment,
  CreateAppointmentDto,
} from "../../domain/entities/appointment";

export interface AppointmentRepository {
  createAppointment(appointment: Appointment): Promise<Appointment>;
  updateAppointment(appointment: Appointment): Promise<Appointment>;
  deleteAppointment(id: string): Promise<void>;
  getAppointmentsByPatientId(patientId: string): Promise<Appointment[]>;
  getAppointmentById(id: string): Promise<Appointment | undefined>;
  getAppointments({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }): Promise<Appointment[]>;
}
