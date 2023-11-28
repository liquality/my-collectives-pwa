import { Knex } from "knex";
import { AuthService } from "../../../services/auth";

export async function seed(knex: Knex): Promise<void> {
  return knex.transaction(async (trx) => {
    // Deletes ALL existing entries
    await trx("challenges").del();
    await trx("groups").del();
    await trx("users").del();

    const [{ id: userId }] = await trx("users").insert(
      {
        publicAddress: "0xe7910F0b83ad155737043c771E2594f74B0BB739",
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


    await trx("challenges").insert([
      {
        name: "Fried Potato Spectrum",
        mintingContractAddress: "0xF41A3e3033D4e878943194B729AeC993a4Ea2045",
        creatorOfMint: "creator.eth",
        chainId: "777777",
        tokenId: "16",
        imageUrl: "ipfs://bafybeiewyx2fybhxaqgjrlsw5p2nj3w6hv3siifgy3ilprodxco5yq24gm",
        category: "art",
        platform: "zora",
        expiration: "2024-07-02 13:23:12.322-0",
        totalMints: "14",

      },
      {
        name: "ENERGY",
        mintingContractAddress: "0xF41A3e3033D4e878943194B729AeC993a4Ea2045",
        creatorOfMint: "",
        chainId: "777777",
        tokenId: "1",
        imageUrl: "ipfs://bafybeifydhtmthjtja7y4m6eyzmyuvzgbt4w7ejuldivv5iitwqqsihxfu",
        category: "art",
        platform: "zora",
        expiration: "2024-07-04 13:58:18.943-0",
        totalMints: "3",

      },

      {
        name: "Gitcoin Impact Report 01: PDF Onchain",
        mintingContractAddress: "0x81D226fb36cA785583E79E84312335d0e166D59B",
        creatorOfMint: "gitcoin.eth",
        chainId: "777777",
        tokenId: "1",
        imageUrl: "ipfs://bafybeieopdawoakmvioeyutkgogc34npcxwzuv2eo3pyconpkbs2ygobtu",
        category: "art",
        platform: "zora",
        expiration: "2030-06-06 13:59:08.053-03",
        totalMints: "2",


      },

      {
        name: "Sonic Zorb",
        mintingContractAddress: "0xb3d0bA3c295FdB0918Fe4BcDE04f62f36E60F50c",
        creatorOfMint: "amy.eth",
        chainId: "777777",
        tokenId: "0",
        imageUrl: "ipfs://QmTPUXc8Kh2NEA6M4B4mKDqxs5dRK5oVuwCj8iyBFtyHcW/0.png",
        category: "art",
        platform: "zora",
        expiration: "2024-07-01 13:59:49.831-03",
        totalMints: "13",


      },

    ]);
  });
}



