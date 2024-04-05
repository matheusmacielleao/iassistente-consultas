import { appointmentService } from "../../../config";

export async function handlerCreateAppointment(
  request: Request,
  url: URL
): Promise<Response> {
  if (!request.body) {
    return new Response("Body is required", { status: 400 });
  }
  const cpf = url.pathname.split("/")[2];
  const payload = await Bun.readableStreamToJSON(request.body);
  const appointment = await appointmentService.createAppointment({
    patientCpf: cpf,
    ...payload,
  });
  return Response.json(appointment);
}

export async function handlerGetPatientAppointments(
  request: Request,
  url: URL
): Promise<Response> {
  const cpf = url.pathname.split("/")[2];
  console.log(cpf);
  const appointments = await appointmentService.getAppointmentsByPatientId(cpf);
  return Response.json(appointments);
}

export async function handlerGetAppointments(
  request: Request,
  url: URL
): Promise<Response> {
  const appointments = await appointmentService.getAppointments({
    offset: 0,
    limit: 10,
  });
  return Response.json(appointments);
}
