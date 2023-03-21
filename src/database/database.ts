import { knex as setupKnex, Knex } from 'knex'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './src/database/database.sqlite',
  },
  migrations: {
    directory: './src/database/migrations',
  },
  seeds: {
    directory: './src/database/seeds',
  },
  useNullAsDefault: true,
}

export const knex = setupKnex(config)
