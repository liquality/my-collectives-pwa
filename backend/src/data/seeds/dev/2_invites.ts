import { Knex } from "knex";
import { AuthService } from "../../../services/auth";
import { generateInviteCode } from "../../../utils";
export async function seed(knex: Knex): Promise<void> {
  return knex.transaction(async (trx) => {
    // Deletes ALL existing entries
    await trx("invites").del();

    const publicAddress = "0xe7910F0b83ad155737043c771E2594f74B0BB739";
    let user = await AuthService.findByAddress(publicAddress);

    const uniqueCodes = [...Array(100).keys()]
      .map(() => generateInviteCode())
      .reduce((acc, code) => ({ ...acc, [code]: true }), {});
    const codes = Object.keys(uniqueCodes).map((code) => ({
      groupId: null,
      code,
      expireAt: null,
      createdBy: user.id,
    }));
    console.log('codes', { codes });
    const results = await trx("invites").insert(codes);
    console.log('invites', { results });
  });
}
