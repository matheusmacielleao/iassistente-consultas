import { TypeOrmDataSource } from "./infra/database/typeorm/type-orm.config";
import {
  handlerCreateAppointment,
  handlerDeleteAppointment,
  handlerGetAppointmentById,
  handlerGetAppointments,
  handlerGetPatientAppointments,
  handlerUpdateAppointment,
} from "./infra/web/handlers/appointment-handler";
import {
  handlerCreatePatient,
  handlerGetPatients,
} from "./infra/web/handlers/patient-handlers";
import { handlerAudioResume } from "./infra/web/handlers/resume-handler";

TypeOrmDataSource.initialize();
const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    console.log(url);
    if (url.pathname == "/patients") {
      if (req.method === "GET") {
        return handlerGetPatients(req);
      }
      if (req.method === "POST") {
        return handlerCreatePatient(req);
      }
    }

    if (url.pathname == "/resume") {
      if (req.method === "POST") {
        return handlerAudioResume(req);
      }
    }

    if (/^\/patients\/\d{11}\/appointments\/\d+$/.test(url.pathname)) {
      if (req.method === "PUT") {
        return handlerUpdateAppointment(req, url.pathname);
      }
      if (req.method === "DELETE") {
        return handlerDeleteAppointment(req, url.pathname);
      }
      if (req.method === "GET") {
        return handlerGetAppointmentById(req, url.pathname);
      }
    }
    if (/^\/patients\/\d{11}\/appointments$/.test(url.pathname)) {
      if (req.method === "POST") {
        return handlerCreateAppointment(req, url.pathname);
      }
      if (req.method === "GET") {
        return handlerGetPatientAppointments(req, url.pathname);
      }
    }
    return new Response("Not found", { status: 404 });
  },
  error(err) {
    return new Response("Internal server error", { status: 500 });
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
