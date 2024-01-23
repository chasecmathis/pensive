import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
    path: '.env.local'
})

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
});
