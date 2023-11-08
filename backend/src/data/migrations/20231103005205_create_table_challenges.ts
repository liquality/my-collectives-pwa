import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("challenges", (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.string("mintingContractAddress").nullable();
        table.integer("chainId").nullable();
        table.string("tokenId").nullable();
        table.string("imageUrl").nullable();
        table.timestamps({ useCamelCase: true });
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("challenges");
}





