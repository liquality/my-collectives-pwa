import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("invites", (table) => {
    table.setNullable("groupId");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("invites", (table) => {
    table.dropNullable("groupId");
  });
}
