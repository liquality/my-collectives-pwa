import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("invites", (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string("code").nullable();
    table.dateTime("usedAt").nullable();
    table.dateTime("expireAt").nullable();
    table.uuid("groupId").notNullable();
    table.foreign("groupId").references("groups.id").onDelete("CASCADE");
    table.uuid("createdBy").nullable();
    table.foreign("createdBy").references("users.id").onDelete("CASCADE");
    table.timestamps({ useCamelCase: true });
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("invites");
}

