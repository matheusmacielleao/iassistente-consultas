import { TypeOrmDataSource } from "./infra/database/typeorm/type-orm.config";
import {
  handlerCreateAppointment,
  handlerGetAppointments,
  handlerGetPatientAppointments,
} from "./infra/web/handlers/appointment-handler";
import {
  handlerCreatePatient,
  handlerGetPatients,
} from "./infra/web/handlers/patient-handlers";

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

    if (/^\/patients\/\d{11}\/appointments$/.test(url.pathname)) {
      if (req.method === "POST") {
        return handlerCreateAppointment(req, url);
      }
      if (req.method === "GET") {
        return handlerGetPatientAppointments(req, url);
      }
    }
    return new Response("Not found", { status: 404 });
  },
  error(err) {
    return new Response("Internal server error", { status: 500 });
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
