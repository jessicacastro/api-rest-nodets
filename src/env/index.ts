import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  PORT: z
    .string()
    .default('3333')
    .transform((port) => Number(port)),
  DATABASE_URL: z.string(),
  MIGRATIONS_DIRECTORY: z.string(),
  SEEDS_DIRECTORY: z.string(),
})

export const env = envSchema.parse(process.env)
