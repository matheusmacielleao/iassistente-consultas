import { patientService } from "./config";
import type { CreatePatientDto } from "./core/domain/entities/patient";

import { TypeOrmDataSource } from "./infra/database/typeorm/type-orm.config";

TypeOrmDataSource.initialize();
const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    if (req.method === "GET") {
      const patients = await patientService.getPatients();
      return Response.json(patients);
    } else if (req.method === "POST") {
      if (!req.body) {
        return new Response("Body is required", { status: 400 });
      }
      const payload: CreatePatientDto = await Bun.readableStreamToJSON(
        req.body
      );

      const patient = await patientService.createPatient(payload);
      return Response.json(patient);
    }
    return new Response();
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
