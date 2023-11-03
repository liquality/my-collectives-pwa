import { Knex } from "knex";
import { AuthService } from "../../services/auth";

export async function seed(knex: Knex): Promise<void> {
  return knex.transaction(async (trx) => {
    // Deletes ALL existing entries
    await trx("pools").del();
    await trx("groups").del();
    await trx("users").del();

    const [{ id: userId }] = await trx("users").insert(
      {
        publicAddress: "0x2De315AE6abAfE5ee6101DD13802736977E4f700",
        nonce: AuthService.createNonce(),
      },
      ["id"]
    );
    console.log({ userId });

    const [{ id: groupId }] = await trx("groups").insert(
      {
        name: "test",
        description: "test",
        createdBy: userId,
      },
      ["id"]
    );
    await trx("user_groups").insert({
      userId: userId,
      groupId,
      admin: true,
    });
    console.log({ groupId });
    // Inserts seed entries
    await trx("pools").insert([
      {
        mintingContractAddress: "0x5aa959de99e0e49b8a85e0a630a74a7b757772b7",
        tokenId: 1,
        chainId: 7777777,
        groupId,
        createdBy: userId,
      },
      {
        mintingContractAddress: "0xf604c8204c4ca417635080c45f4ace8d0a7cf3ca",
        tokenId: 7,
        chainId: 7777777,
        groupId,
        createdBy: userId,
      },
      {
        mintingContractAddress: "0xa51e30df685c413d4b399ea2fd0d90373b01d0b4",
        tokenId: 1,
        chainId: 7777777,
        groupId,
        createdBy: userId,
      },
      {
        mintingContractAddress: "0x6c10be7531ec182b90fa65679110ba2b3dcefb8c",
        tokenId: 1,
        chainId: 7777777,
        groupId,
        createdBy: userId,
      },
      {
        mintingContractAddress: "0xf032d92a685fbcd4420e437b7903ed866be04b87",
        tokenId: 1,
        chainId: 7777777,
        groupId,
        createdBy: userId,
      },
      {
        mintingContractAddress: "0x88ad6d028f415ae1ee36c98466fe5d1e7f33c327",
        tokenId: 1,
        chainId: 7777777,
        groupId,
        createdBy: userId,
      },
    ]);
  });
}
