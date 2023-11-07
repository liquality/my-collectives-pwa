import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("challenges", (table) => {
        table.increments();
        table.uuid('poolId').defaultTo(null) //Not sure if it makes sense to have the foreign key as null?
        table.string("mintingContractAddress").nullable();
        table.integer("chainId").nullable();
        table.string("tokenId").nullable();
        table.foreign("poolId").references("pools.id").onDelete("CASCADE");
        table.timestamps({ useCamelCase: true });
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("challenges");
}





