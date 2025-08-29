import { defineConfig } from "@prisma/config";
import dotenv from "dotenv";

dotenv.config(); // <- supaya Prisma baca .env

export default defineConfig({
  schema: "./prisma/schema.prisma",
});
