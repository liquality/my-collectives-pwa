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

        id: "56a8fb86-2cf5-4070-a626-c9f031b2dc1f",
        mintingContractAddress: "0xa3b59a1080f2ae8efbe902bb03c15cb342d648fd",
        chainId: 5,
        tokenId: "1",
        category: "art",
        name: "Group-mints-test-goerli-1",
        kind: "erc1155",
        platform: "Zora",
        floorPrice: "0.00078",
        expiration: "2024-01-17T14:26:48.851Z",
        expired: null,
        totalMints: 8,
        imageUrl: null,
        network: "goerli",
        creatorOfMint: "0xe7910F0b83ad155737043c771E2594f74B0BB739",
        honeyPotAddress: "0x52c738C2dd912F909151e399051bf6d723ca707D",
      },
      {

        id: "693df15c-12cd-4cab-83a7-ea6f9e022a15",
        mintingContractAddress: "0xee5251d595655583bc42bb206763d75f977f14d9",
        chainId: 5,
        tokenId: "1",
        category: "art",
        name: "Mint-fee-test-goerli-group-mints",
        kind: "erc1155",
        platform: "Zora",
        floorPrice: "0.00088",
        expiration: "2024-01-13T14:28:21.090Z",
        expired: null,
        totalMints: 14,
        imageUrl: null,
        network: "goerli",
        creatorOfMint: "0xe7910F0b83ad155737043c771E2594f74B0BB739",
        honeyPotAddress: "0x1D88aa6706a5874a4630b1D434710Cb6a27D991c",
      },
      {

        id: "a1eb5f5e-8727-4628-a116-98eacd89c382",
        mintingContractAddress: "0x8bc07A56032D4caCb7A4516c016c9120908E7eab",
        chainId: 5,
        tokenId: null,
        category: "art",
        name: "MockTokenContract",
        kind: "erc721",
        platform: "Other",
        floorPrice: "0",
        expiration: "2024-01-15T13:52:03.661Z",
        expired: null,
        totalMints: 2,
        imageUrl: null,
        network: "goerli",
        creatorOfMint: "0x587ce1a413d47dd1b9c8a54c949016c147f18d19",
        honeyPotAddress: "0x4d3b3E2338e9c871CCf2E744c21F9473817c2cdE",
      },

    ]);
  });


}





