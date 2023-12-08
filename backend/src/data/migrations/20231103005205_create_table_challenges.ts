import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("challenges", (table) => {
        table.uuid('id').primary().defaultTo(knex.fn.uuid());
        table.string("name").nullable();
        table.string("creatorOfMint").nullable();
        table.string("mintingContractAddress").nullable();
        table.integer("chainId").nullable();
        table.string("tokenId").nullable();
        table.string("imageUrl", 2048).nullable();
        table.string("floorPrice").nullable();
        table.string("network").nullable();
        table.string("description", 2048).nullable();
        table.string("kind").nullable();
        table.string("category").nullable(); //music, art, or other type
        table.string("platform").nullable(); //sound, zora or prohobition
        table.timestamp("expiration").nullable(); //example: 7 days from creation //expiration: new Date("2023-12-01T12:00:00Z")
        table.integer("totalMints").nullable()
        table.boolean("expired").nullable();
        table.unique(["tokenId", "mintingContractAddress", "creatorOfMint"])
        table.timestamps({ useCamelCase: true });
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("challenges");
}





