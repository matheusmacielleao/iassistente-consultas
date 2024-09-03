import { AppointmentService } from "./core/application/appointment /appointment-service";
import { PatientService } from "./core/application/patient/patient-service";
import { AppointmentModel } from "./infra/database/typeorm/models/appointment.model";
import { PatientModel } from "./infra/database/typeorm/models/patient.model";
import { TypeOrmAppointmentRepository } from "./infra/database/typeorm/repositories/typeorm-appointment-repository";
import { TypeOrmPatientRepository } from "./infra/database/typeorm/repositories/typeorm-patient-repository";
import { TypeOrmDataSource } from "./infra/database/typeorm/type-orm.config";
import OpenAI from "openai";
import { ChatGptLLMService } from "./infra/ia/chatgpt-llm-service";
import { WhisperService } from "./infra/ia/whisper-service";
import { GenerateAppointmentResume } from "./core/application/transcription/generate-appointment-resume";

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

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const llmService = new ChatGptLLMService(openai);
const speechToText = new WhisperService(openai);

export const generateAppointmentResume = new GenerateAppointmentResume(
  llmService,
  speechToText
);
