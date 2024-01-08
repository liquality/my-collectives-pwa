import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string("publicAddress").notNullable().unique();
    table.string("nonce").notNullable();
    table.boolean("isCreator").defaultTo(false);
    table.timestamps({ useCamelCase: true });
  });
}

export async function down({ schema }: Knex): Promise<void> {
  return schema.dropTableIfExists("users");
}
