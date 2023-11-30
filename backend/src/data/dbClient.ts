import knex from "knex";
import config from "../config/database";

export const dbClient = knex(config);