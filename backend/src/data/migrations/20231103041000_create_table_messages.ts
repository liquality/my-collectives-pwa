import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("messages", (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string("mintingContractAddress").nullable();
    table.text("content").notNullable();
    table.uuid("userId").notNullable();
    table.uuid("groupId").notNullable();
    table.foreign("groupId").references("groups.id").onDelete("CASCADE");
    table.foreign("userId").references("users.id").onDelete("CASCADE");
    table.timestamps({ useCamelCase: true });
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("messages");
}
