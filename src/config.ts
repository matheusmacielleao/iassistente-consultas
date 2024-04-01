import { PatientService } from "./core/application/patient/patient-service";
import { PatientModel } from "./infra/database/typeorm/models/patient.model";
import { TypeOrmPatientRepository } from "./infra/database/typeorm/repositories/typeorm-patient-repository";
import { TypeOrmDataSource } from "./infra/database/typeorm/type-orm.config";

const patientModel = TypeOrmDataSource.getRepository(PatientModel);
const patientRepository = new TypeOrmPatientRepository(patientModel);
export const patientService = new PatientService(patientRepository);
