import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("pools", (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.uuid('groupId').notNullable();
        table.uuid('challengeId').notNullable();
        table.uuid("createdBy").nullable();
        table.string('publicAddress').nullable().unique();
        table.foreign("challengeId").references("challenges.id").onDelete("CASCADE");
        table.foreign("groupId").references("groups.id").onDelete("CASCADE");
        table.foreign("createdBy").references("users.id").onDelete("CASCADE");
        table.timestamps({ useCamelCase: true });
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("pools");
}

