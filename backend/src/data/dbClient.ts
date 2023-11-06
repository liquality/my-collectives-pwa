import knex from "knex";
import config from "../config/database";

const env = process.env.NODE_ENV || "development";

export const dbClient = knex(config[env]);