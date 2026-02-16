import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "../shared/schema";

const databaseUrl = process.env.DATABASE_URL;

export const db = databaseUrl
  ? drizzle(databaseUrl, {
      schema,
    })
  : null;

export function isDatabaseAvailable(): boolean {
  return db !== null;
}
