import * as dotenv from "dotenv";
import { type Config } from "drizzle-kit";

dotenv.config({
  path: process.env.NODE_ENV !== "production" ? ".env.local" : ".env",
});

export default {
  schema: "./src/server/db/schema.ts",
  out: "./src/server/db/migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
  tablesFilter: ["trackr_*"],
} satisfies Config;
