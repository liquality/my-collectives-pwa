import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string("publicAddress").notNullable();
    table.string("nonce").notNullable();
    table.timestamps({ useCamelCase: true });
  });
}

export async function down({ schema }: Knex): Promise<void> {
  return schema.dropTable("users");
}
