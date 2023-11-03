import { Knex } from "knex";

export async function up({ schema }: Knex): Promise<void> {
  return schema.createTable("user_groups", (table) => {
    table.increments();
    table.uuid('groupId').notNullable();
    table.uuid('userId').notNullable();
    table.foreign("groupId").references("groups.id").onDelete("CASCADE");
    table.foreign("userId").references("users.id").onDelete("CASCADE");
    table.boolean("admin").defaultTo(false);
    table.unique(["userId", "groupId"]);
    table.timestamps({ useCamelCase: true });
  });
}

export async function down({ schema }: Knex): Promise<void> {
  return schema.dropTable("user_groups");
}
