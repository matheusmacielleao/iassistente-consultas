import type { Repository } from "typeorm";
import type { AppointmentRepository } from "../../../../core/application/appointment /appointment-repository";
import type { AppointmentModel } from "../models/appointment.model";
import type {
  CreateAppointmentDto,
  Appointment,
} from "../../../../core/domain/entities/appointment";

export class TypeOrmAppointmentRepository implements AppointmentRepository {
  constructor(private readonly repo: Repository<AppointmentModel>) {}

  async getAppointmentsByPatientId(patientId: string): Promise<Appointment[]> {
    return this.repo.find({
      where: { patient: { cpf: patientId } },
    });
  }
  async createAppointment(appointment: Appointment): Promise<Appointment> {
    const newAppointment = this.repo.create(appointment);
    await this.repo.save(newAppointment);
    return newAppointment;
  }
  updateAppointment(appointment: Appointment): Promise<Appointment> {
    throw new Error("Method not implemented.");
  }
  deleteAppointment(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getAppointmentById(id: string): Promise<Appointment | undefined> {
    throw new Error("Method not implemented.");
  }
  async getAppointments({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }): Promise<Appointment[]> {
    const appointments = await this.repo.find({
      skip: offset,
      take: limit,
    });
    return appointments;
  }
}
