import { Knex } from "knex";
import path from "path";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      user: "group_mints",
      password: "1q2w3e",
      database: "group_mints",
      host: "localhost",
      port: 5432,
    },
    migrations: {
      directory: path.resolve(__dirname, "..", "data", "migrations")
    },
    seeds: {
      directory: path.resolve(__dirname, "..", "data", "seeds")
    }
  },
  test: {
    client: "pg",
    connection: {
      user: process.env.CI_DB_USERNAME,
      password: process.env.CI_DB_PASSWORD,
      database: process.env.CI_DB_NAME,
      host: process.env.CI_DB_HOSTNAME || "127.0.0.1",
      port: 3306,
    },
    migrations: {
      directory: path.resolve(__dirname, "..", "data", "migrations")
    }
  },
  production: {
    client: "pg",
    connection: {
      user: process.env.PROD_DB_USERNAME,
      password: process.env.PROD_DB_PASSWORD,
      database: process.env.PROD_DB_NAME,
      host: process.env.PROD_DB_HOSTNAME,
      port: Number(process.env.PROD_DB_PORT) || 3306,
    },
    migrations: {
      directory: path.resolve(__dirname, "..", "data", "migrations")
    }
  },
};

export default config;
