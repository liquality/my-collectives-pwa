import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("groups", (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.string('name').nullable();
        table.string('description').nullable();
        table.string('publicAddress').nullable().unique();
        table.bigint('nonceKey').nullable();
        table.bigint('salt').nullable();
        table.string('walletAddress').nullable().unique();
        table.integer('mintCount').defaultTo(0).notNullable(); //increment this value after someone has minted to/thorugh group 
        table.integer('wonChallenges').defaultTo(0).notNullable(); //increment this value after the group has been set as Top Contributor
        table.integer('totalRewardedInEth').defaultTo(0).notNullable(); //NOT SURE BUT: increment this value after listening to withdrawalReward()→ emits an event (participant: userWhoGetTheReward, amount), this is related to a poolAddress and that pool has an assosciated groupAddress that I can get?
        table.uuid("createdBy").notNullable();
        table.foreign("createdBy").references("users.id").onDelete("CASCADE");
        table.timestamps({ useCamelCase: true });
    });
}


export async function down({ schema }: Knex): Promise<void> {
    return schema.dropTableIfExists("groups");
}


