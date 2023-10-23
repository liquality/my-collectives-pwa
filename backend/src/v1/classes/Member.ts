import MySQL, { db } from "../../MySQL";
import ApiError from "./ApiError";
import { OkPacket, QueryError, RowDataPacket } from "mysql2"
import Group from "./Group";

class Member {
    id?: number;
    group_id?: number;
    sender?: string;
    joined_at?: Date;

    constructor(invite?: Member) {
        if (invite) {
            this.set(invite);
        }
    }

    set(member: Member) {
        if (member) {
            this.id = member.id;
            this.group_id = member.group_id;
            this.sender = member.sender;
            this.joined_at = member.joined_at;
        }
    }


    /*                  */
    /* CRUD OPERATIONS  */
    /*                  */
    create = async (): Promise<Member> => {
        const member = this;

        return new Promise<Member>((resolve, reject) => {
            // Insert new row
            MySQL.pool.getConnection((err, db) => {
                if (err) {
                    reject(new ApiError(500, err.toString()));
                    return;
                }

                db.query(
                    "INSERT INTO `member` (group_id, sender, joined_at) VALUES (?, ?, UTC_TIMESTAMP());",
                    [member.group_id, member.sender],
                    (err, results: RowDataPacket[], fields) => {
                        if (err) {
                            db.release();
                            reject(new ApiError(500, err.toString()));
                            return;
                        }

                        if ("insertId" in results) {
                            const memberId = results.insertId;
                            // Create a query to select the newly inserted group
                            db.query(
                                "SELECT * FROM `member` WHERE id = ?",
                                [memberId],
                                (err, results: RowDataPacket[], fields) => {
                                    if (err) {
                                        db.release();
                                        reject(new ApiError(500, err.toString()));
                                        return;
                                    }

                                    const newMember = new Member(results[0] as Member);
                                    resolve(newMember);
                                    db.release();
                                }
                            );
                        } else {
                            db.release();
                        }
                    }
                );
            });
        });
    };




    read = async (senderAddress: string): Promise<Member | { id: null }> => {
        const invite = this;
        const promise = new Promise<Member | { id: null }>((resolve, reject) => {
            if (senderAddress) {
                MySQL.pool.getConnection((err, db) => {
                    db.execute(
                        "select * from `invite` where invite_link = ?",
                        [senderAddress],
                        (err: any, results: any, fields: any) => {
                            if (err) {
                                reject(new ApiError(500, err));
                            } else if (results.length < 1) {
                                resolve({ id: null });
                            } else {
                                invite.set(results[0]);
                                resolve(invite);
                            }
                            db.release();
                        }
                    );
                });
            } else {
                reject(new ApiError(500, "Missing sender address"));
            }
        });
        return promise;
    };

    async getNumberOfGroupMembers(groupId: string): Promise<{ member_count: number } | null> {
        const query = `
          SELECT COUNT(m.id) AS member_count
          FROM \`group\` g
          LEFT JOIN member m ON g.id = m.group_id
          WHERE g.id = ?;
        `;
        const results = await db.query(query, [groupId]);

        if (results.length > 0) {
            let memberCount = { member_count: results[0].member_count }
            return memberCount
        }

        return null;
    }

    readAllGroupsForMember = async (senderAddress: string): Promise<Group[] | { id: null }> => {
        if (senderAddress) {
            try {
                const results: any = await db.query(
                    "SELECT g.* FROM `group` g " +
                    "INNER JOIN `member` m ON g.id = m.group_id " +
                    "WHERE m.sender = ?",
                    [senderAddress]
                );

                if (results.length < 1) {
                    return { id: null };
                } else {
                    const groups: Group[] = await Promise.all(results.map(async (row: RowDataPacket) => {
                        const nrOfMembersData = await this.getNumberOfGroupMembers(row.id);
                        const nrOfMembers = nrOfMembersData ? nrOfMembersData.member_count : 0;
                        console.log(nrOfMembers, 'NR OF MEMBERS')
                        return {
                            id: row.id,
                            group_name: row.group_name,
                            public_address: row.public_address,
                            rewards: row.rewards,
                            created_at: row.created_at,
                            number_of_members: nrOfMembers,
                        };
                    }));

                    return groups;
                }
            } catch (err) {
                console.log(err);
                return { id: null };
            }
        } else {
            return { id: null };
        }
    };




    update = async (): Promise<Member> => {
        const invite = this;
        const promise = new Promise<Member>((resolve, reject) => {
            MySQL.pool.getConnection((err, db) => {
                db.query(
                    "UPDATE `invite` SET group_id=?, link=?, is_used=?, expiry_date=? WHERE id=?;",
                    [
                        invite.group_id,

                    ],
                    (err, results: OkPacket, fields) => {
                        if (err) {
                            reject(new ApiError(500, err.toString()));
                        } else if (results.affectedRows < 1) {
                            reject(new ApiError(404, "Invite not found!"));
                        } else {
                            resolve(invite);
                        }
                        db.release();
                    }
                );
            });
        });
        return promise;
    };


    delete = async (id: number): Promise<void> => {
        const promise = new Promise<void>((resolve, reject) => {
            if (id) {
                MySQL.pool.getConnection((err, db) => {
                    db.execute(
                        "delete from `invite` where `id` = ?",
                        [id],
                        (err, results: RowDataPacket[], fields) => {
                            if (err) {
                                reject(new ApiError(500, err.toString()));
                            } else if (results.length < 1) {
                                reject(new ApiError(400, "Nothing deleted"));
                            } else {
                                resolve();
                            }
                            db.release();
                        }
                    );
                });
            } else {
                reject(new ApiError(400, "Missing invite id"));
            }
        });
        return promise;
    };
}

export default Member;
