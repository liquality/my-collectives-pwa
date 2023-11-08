import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("groups", (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.string('name').notNullable();
        table.string('description').nullable();
        table.string('publicAddress').nullable();
        table.integer('rewards').defaultTo(0).notNullable();
        table.uuid("createdBy").notNullable();
        table.foreign("createdBy").references("users.id").onDelete("CASCADE");
        table.timestamps({ useCamelCase: true });
    });
}


export async function down({ schema }: Knex): Promise<void> {
    return schema.dropTableIfExists("groups");
}

