import { patientService } from "../../../config";
import type {
  CreatePatientDto,
  Patient,
} from "../../../core/domain/entities/patient";

export async function handlerCreatePatient(
  request: Request
): Promise<Response> {
  if (!request.body) {
    return new Response("Body is required", { status: 400 });
  }
  const payload: CreatePatientDto = await Bun.readableStreamToJSON(
    request.body
  );

  const patient: Patient = await patientService.createPatient(payload);
  return Response.json(patient);
}

export async function handlerGetPatients(request: Request): Promise<Response> {
  const patients = await patientService.getPatients();
  return Response.json(patients);
}
