import { knex as setupKnex, Knex } from 'knex'
import { env } from '../env'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL,
  },
  migrations: {
    directory: env.MIGRATIONS_DIRECTORY,
  },
  seeds: {
    directory: env.SEEDS_DIRECTORY,
  },
  useNullAsDefault: true,
}

export const knex = setupKnex(config)
