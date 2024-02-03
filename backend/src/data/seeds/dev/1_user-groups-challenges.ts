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
        id: "13c7d5d7-05f4-435f-87c7-126ff26f2f21",
        mintingContractAddress: "0xfcf069b5876ab35107e44906933cf67110a60bcd",
        chainId: 10,
        tokenId: null,
        category: "music",
        name: "Karma.wav - BREATHE",
        kind: "erc721",
        floorPrice: "0.00078",
        expiration: "2023-12-17T15:29:09.644Z",
        expired: null,
        totalMints: 28,
        imageUrl: "https://img.reservoir.tools/images/v2/optimism/ldXga3w5LnmrtU6KljLWfUlu8HfaO8ITP6Qa1%2ByIa3wZjvpQ0%2FenYI8QxnThWpoV%2Fw8JlZ3tNvKq8fesoPtKUnUZGQTsl6%2FJMXBwe2Zkc8YZ6t2tXlSakl4GsvSs4MB0cOsOyHPULZwHPCK1CRH6hTeUgGP4AE%2FYu4oDeq9lyE5dinGGdd3lj3lqqwv7D6YF",
        network: "optimism",
        creatorOfMint: "0xe7910F0b83ad155737043c771E2594f74B0BB739",
        honeyPotAddress: "honey0xfcf069b5876ab35107e44906933cf67110a60bcd",

      },
      {
        id: "0a3bff0b-2e41-4535-b14b-23cff27419c6",
        mintingContractAddress: "0x9f3303e2c04e79387c3b5089b8a73e0b466e9076",
        chainId: 10,
        tokenId: null,
        category: "music",
        name: "Pete Rango - HONEY ft Betty Dawl",
        kind: "erc721",
        floorPrice: "0.00078",
        expiration: "2023-12-19T15:29:46.688Z",
        expired: null,
        totalMints: 102,
        imageUrl: "https://img.reservoir.tools/images/v2/optimism/ldXga3w5LnmrtU6KljLWfUlu8HfaO8ITP6Qa1%2ByIa3wZjvpQ0%2FenYI8QxnThWpoVEiuLQARDLoZoOIU7SV2dFUKLqNlwJoaRXRnYgyjR%2BwUiKG7opbVx29UD8bN3Fu9PU3w8ALcBo5s0kbc1mGIyh7kYgtIIaSSHSDDnSLDmqdqLf%2Fqny4x6LLTJzSnyuzjv",
        network: "optimism",
        creatorOfMint: "0xe7910F0b83ad155737043c771E2594f74B0BB739",
        honeyPotAddress: "honey0x9f3303e2c04e79387c3b5089b8a73e0b466e9076",


      },
      {
        id: "53a61b1c-a008-4fff-b8a1-d4f509765891",
        mintingContractAddress: "0xbd87f4da73ff92a7bea31e2de20e14f9829f42fe",
        chainId: 8453,
        tokenId: null,
        category: "art",
        name: "Keepers Of Wisdom",
        kind: "erc721",
        floorPrice: "0.00778",
        expiration: "2023-12-19T15:30:09.425Z",
        expired: null,
        totalMints: 10,
        imageUrl: "https://img.reservoir.tools/images/v2/base/hc%2BnPcLmWxs%2FDW99DlBQ42k40ZoyYV5jCIms5qHjwvuiiod1GIdCBqGsYCdDMem3ilRBzFP%2BrZrV8f92sO2zb1bE7la8NyJUSf2FHzsOwXDyehGVJtjY04yxEDVnKrnlLnLKCDLNSZiPiqDzBabHZfq636Dwjry3EPfzqmjrtEbdSsTTr69sJG6KieVpgAmG?width=512",
        network: "base",
        creatorOfMint: "0x625307de45bd25ad6bf6cc7391a308fc84067cf7",
        honeyPotAddress: "honey0xbd87f4da73ff92a7bea31e2de20e14f9829f42fe",


      },
      {
        id: "6aa14761-275b-4c0b-9e1a-4f2530156ba7",
        mintingContractAddress: "0x5aa959de99e0e49b8a85e0a630a74a7b757772b7",
        chainId: 7777777,
        tokenId: "1",
        category: "art",
        name: "ThereIsNoHEAVENThereIsNoHELL",
        kind: "erc1155",
        floorPrice: "0.0015",
        expiration: "2023-12-22T15:30:35.702Z",
        expired: null,
        totalMints: 487,
        imageUrl: "https://img.reservoir.tools/images/v2/zora/hc%2BnPcLmWxs%2FDW99DlBQ42k40ZoyYV5jCIms5qHjwvvxzrfLu4GyGWsfcmGlU0MDMiivLAWSZu2LUywcr6DPMKZk%2B%2BH%2F7riXkaK3Iq%2BOS4mHiyxrfOdQwkwz7JSYRSo8ZCvVfirTPdS5xpBDKdL8SYQDFBH1Dv5g6vyBLFDdyEEPPPH9Kd3Bw5U%2BZr9c%2BtcE?width=512",
        network: "zora",
        creatorOfMint: "0xe7910F0b83ad155737043c771E2594f74B0BB",
        honeyPotAddress: "honey0x5aa959de99e0e49b8a85e0a630a74a7b757772b7",


      },
      {
        id: "b79e4d78-ffd9-4ea0-9647-1c437d2c10df",
        mintingContractAddress: "0x6a7463c342027ee8452f2686ccfa9b73026b4095",
        chainId: 10,
        tokenId: "1",
        category: "music",
        name: "Break It - msft (Vivid Fever Dreams FLIP) - Limited #1",
        kind: "erc721",
        floorPrice: "0.00478",
        expiration: "2023-12-25T15:31:05.863Z",
        expired: null,
        totalMints: 1,
        imageUrl: "https://img.reservoir.tools/images/v2/optimism/ldXga3w5LnmrtU6KljLWfUlu8HfaO8ITP6Qa1%2ByIa3wZjvpQ0%2FenYI8QxnThWpoV8D2KJW6d2w8S9SwXBG2ZwD9UH%2BebUWw6q%2FrdVQWUjq0saRy3e%2BsZujPeVoK3txL1Pjo9gCNEKUyRs9Ufwp0D6Uhbe6Oo3G8SzsWz8o5DcelYUDplWh90mIQ38T7%2FWUsU?width=512",
        network: "optimism",
        creatorOfMint: "0xe7910F0b83ad155737043c771E2594f74B0BB739",
        honeyPotAddress: "honey0x6a7463c342027ee8452f2686ccfa9b73026b4095",


      },
      {
        id: "334a7b31-667b-4ec8-8beb-f8e777d5c764",
        mintingContractAddress: "0x0ca749904757abce70c76ef53b833cf657f59e7e",
        chainId: 5,
        tokenId: "1",
        category: "art",
        name: "Jojo's HoneyPot: 0x9Eb...5988",
        kind: "erc1155",
        platform: "Zora",
        floorPrice: "0.00188",
        expiration: "2024-02-19T13:20:06.433Z",
        expired: null,
        totalMints: 5,
        salt: 3221302301101211,
        imageUrl: null,
        network: "goerli",
        creatorOfMint: "0xe7910F0b83ad155737043c771E2594f74B0BB739",
        honeyPotAddress: "0x8A3f643Aea7d030CF02233B4e6C6F57bD0160b1d",
        createdAt: new Date()
      },
      {
        id: "6dbfa2f3-51aa-4d36-b4a3-209418cec944",
        mintingContractAddress: "0xad5e9771fa4f18d105bd86dd8b3172a2564a1178",
        chainId: 5,
        tokenId: "1",
        category: "music",
        name: "Johanna-Goerli w honeypot 0x4952...C358",
        kind: "erc1155",
        platform: "Zora",
        floorPrice: null,
        expiration: "2024-02-05T13:15:30.834Z",
        expired: null,
        salt: 1310033300203022,
        totalMints: 2,
        imageUrl: null,
        network: "goerli",
        creatorOfMint: "0xe7910F0b83ad155737043c771E2594f74B0BB739",
        honeyPotAddress: "0x7C1A3EE3b0FF752963D0865ea549f1FEb9CF32b6",
        createdAt: new Date()
      },
    ]);
  });


}





