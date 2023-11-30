
import { dbClient } from "../data";

export const generateInviteCode = (length = 8) => Math.random()
    .toString(36)
    .replace(/[^a-z09]+/g, "")
    .substring(0, length)
    .toUpperCase();



//Generates 5 invite codes for a user and a group
export async function giveUserInvitesForGroup(userId: string, groupId: string, numberOfInvites: number): Promise<void> {
    const uniqueCodes = [...Array(numberOfInvites).keys()]
        .map(() => generateInviteCode())
        .reduce((acc, code) => ({ ...acc, [code]: true }), {});
    const codes = Object.keys(uniqueCodes).map((code) => ({
        groupId: groupId,
        code,
        createdBy: userId,
        createdAt: dbClient.fn.now(),
        updatedAt: dbClient.fn.now(),
        userId: userId,
    }));
    await dbClient("invites").insert(codes);
}

