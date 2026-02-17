import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../shared/schema";

const databaseUrl = process.env.DATABASE_URL;

const client = databaseUrl
  ? postgres(databaseUrl, { ssl: "require", max: 1, prepare: false, connect_timeout: 5 })
  : null;

export const db = client
  ? drizzle(client, { schema })
  : null;

export function isDatabaseAvailable(): boolean {
  return db !== null;
}
