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

      {
        mintingContractAddress: '0xBD87f4dA73ff92A7BeA31e2dE20E14f9829f42Fe',
        chainId: 8453,
        tokenId: null,
        category: 'music',
        name: 'Keepers Of Wisdom',
        platform: null,
        expiration: "2024-02-13T21:41:36.090Z",
        expired: null,
        totalMints: 10,
        imageUrl: 'https://img.reservoir.tools/images/v2/base/hc%2BnPcLmWxs%2FDW99DlBQ42k40ZoyYV5jCIms5qHjwvuiiod1GIdCBqGsYCdDMem3ilRBzFP%2BrZrV8f92sO2zb1bE7la8NyJUSf2FHzsOwXDyehGVJtjY04yxEDVnKrnlLnLKCDLNSZiPiqDzBabHZfq636Dwjry3EPfzqmjrtEbdSsTTr69sJG6KieVpgAmG?width=512',
        creatorOfMint: '0x625307de45bd25ad6bf6cc7391a308fc84067cf7'
      },

      {
        mintingContractAddress: '0x9F3303E2C04e79387C3B5089B8a73e0B466e9076',
        chainId: 10,
        tokenId: null,
        category: 'music',
        name: 'Pete Rango - HONEY ft Betty Dawl',
        platform: null,
        expiration: "2024-02-10T21:46:09.910Z",
        expired: null,
        totalMints: 101,
        imageUrl: 'https://img.reservoir.tools/images/v2/optimism/ldXga3w5LnmrtU6KljLWfUlu8HfaO8ITP6Qa1%2ByIa3wZjvpQ0%2FenYI8QxnThWpoVEiuLQARDLoZoOIU7SV2dFUKLqNlwJoaRXRnYgyjR%2BwUiKG7opbVx29UD8bN3Fu9PU3w8ALcBo5s0kbc1mGIyh7kYgtIIaSSHSDDnSLDmqdqLf%2Fqny4x6LLTJzSnyuzjv',
        creatorOfMint: "peterango.eth"
      },

      {
        mintingContractAddress: '0xbc2ca61440faf65a9868295efa5d5d87c55b9529',
        chainId: 7777777,
        tokenId: null,
        category: 'art',
        name: 'sqr(16)',
        platform: null,
        expiration: "2023-12-12T21:59:02.806Z",
        expired: null,
        totalMints: 515200,
        imageUrl: 'https://img.reservoir.tools/images/v2/zora/hc%2BnPcLmWxs%2FDW99DlBQ42k40ZoyYV5jCIms5qHjwvtE2G7JSZ5NiF4xU%2F0kOsOnXSdFDdpd3qZtJdJ0HSfrgiQOQzuJ8CsbfqCqED1URzXTKjhi7mLwPZVQY3FJE7FOfBXNSJ8gHYSiLGPPhE%2BuJMv%2BWFQBzaigZ4PI6TnAdmC7Ev1T0p%2FD%2BL%2BnQCM7WHvl',
        creatorOfMint: '0xdbe0c5341a229e604ef99093972f5e30984f95ac'
      }

    ]);
  });
}



