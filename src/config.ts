import { AppointmentService } from "./core/application/appointment /appointment-service";
import { PatientService } from "./core/application/patient/patient-service";
import { AppointmentModel } from "./infra/database/typeorm/models/appointment.model";
import { PatientModel } from "./infra/database/typeorm/models/patient.model";
import { TypeOrmAppointmentRepository } from "./infra/database/typeorm/repositories/typeorm-appointment-repository";
import { TypeOrmPatientRepository } from "./infra/database/typeorm/repositories/typeorm-patient-repository";
import { TypeOrmDataSource } from "./infra/database/typeorm/type-orm.config";

const patientModel = TypeOrmDataSource.getRepository(PatientModel);
const patientRepository = new TypeOrmPatientRepository(patientModel);
export const patientService = new PatientService(patientRepository);

const appointmentModel = TypeOrmDataSource.getRepository(AppointmentModel);
const appointmentRepository = new TypeOrmAppointmentRepository(
  appointmentModel
);
export const appointmentService = new AppointmentService(
  appointmentRepository,
  patientService
);
