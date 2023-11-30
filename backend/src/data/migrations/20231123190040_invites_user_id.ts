import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("invites", (table) => {
    table.uuid("userId").nullable();
    table.foreign("userId").references("users.id").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("invites", (table) => {
    table.dropForeign("userId");
    table.dropColumn("userId");
  });
}
