import { appointmentService } from "../../../config";

export async function handlerCreateAppointment(
  request: Request,
  pathname: string
): Promise<Response> {
  if (!request.body) {
    return new Response("Body is required", { status: 400 });
  }
  const cpf = pathname.split("/")[2];
  const payload = await Bun.readableStreamToJSON(request.body);
  const appointment = await appointmentService.createAppointment({
    patientCpf: cpf,
    ...payload,
  });
  return Response.json(appointment);
}

export async function handlerGetPatientAppointments(
  request: Request,
  pathname: string
): Promise<Response> {
  const cpf = pathname.split("/")[2];
  console.log(cpf);
  const appointments = await appointmentService.getAppointmentsByPatientId(cpf);
  return Response.json(appointments);
}

export async function handlerUpdateAppointment(
  request: Request,
  pathname: string
): Promise<Response> {
  const id = pathname.split("/")[4];
  if (!request.body) {
    return new Response("Body is required", { status: 400 });
  }
  const payload = await Bun.readableStreamToJSON(request.body);
  const appointment = await appointmentService.updateAppointment(
    Number(id) as any,
    payload
  );
  return Response.json(appointment);
}

export async function handlerDeleteAppointment(
  request: Request,
  pathname: string
): Promise<Response> {
  const id = pathname.split("/")[4];

  const appointment = await appointmentService.deleteAppointment(
    Number(id) as any
  );
  return Response.json(appointment);
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

export async function handlerGetAppointmentById(
  request: Request,
  pathname: string
): Promise<Response> {
  const id = pathname.split("/")[4];
  const appointment = await appointmentService.getAppointmentById(id);
  return Response.json(appointment);
}
