import { Knex } from "knex";



export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user_rewards", (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string("numberOfMints").nullable(); //increment this value after user has minted something in our app
    table.string("amountInEthEarned").nullable(); //increment this value after listening to withdrawalReward()→ emits an event (participant: userWhoGetTheReward, amount)
    table.uuid("userId").notNullable();
    table.uuid("poolId").nullable();
    table.uuid("groupId").nullable();
    table.foreign("poolId").references("pools.id").onDelete("CASCADE");
    table.foreign("groupId").references("groups.id").onDelete("CASCADE");
    table.foreign("userId").references("users.id").onDelete("CASCADE");
    table.unique(["userId", "groupId"]);
    table.unique(["userId", "groupId", "poolId"]);

    table.dateTime("claimedAt").nullable();

    table.timestamps({ useCamelCase: true });
  });
}




export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("user_rewards");
}


