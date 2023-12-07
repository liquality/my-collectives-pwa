import { Knex } from "knex";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });
const env = process.env.NODE_ENV || "development";
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
      directory: path.resolve(__dirname, "..", "data", "seeds", "dev")
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
    },
    seeds: {
      directory: path.resolve(__dirname, "..", "data", "seeds", "test")
    }
  },
  production: {
    client: "pg",
    connection: {
      user: process.env.PROD_DB_USERNAME,
      password: process.env.PROD_DB_PASSWORD,
      database: process.env.PROD_DB_NAME,
      host: process.env.PROD_DB_HOST,
      port: Number(process.env.PROD_DB_PORT) || 5432,
    },
    migrations: {
      directory: path.resolve(__dirname, "..", "data", "migrations")
    },
    seeds: {
      directory: path.resolve(__dirname, "..", "data", "seeds", "dev")
    }
  },
};
console.log(`using environment: ${env}`);
export default config[env];
