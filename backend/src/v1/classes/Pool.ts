import MySQL, { db } from "../../MySQL";
import ApiError from "./ApiError";
import { RowDataPacket } from "mysql2"


class Pool {
    id?: number;
    group_id?: number;
    minting_contract_address?: string;
    chain_id?: number;
    created_at?: Date;
    token_id?: string;

    constructor(pool?: Pool) {
        if (pool) {
            this.set(pool);
        }
    }

    set(pool: Pool) {
        if (pool) {
            this.id = pool.id;
            this.group_id = pool.group_id;
            this.minting_contract_address = pool.minting_contract_address;
            this.chain_id = pool.chain_id;
            this.created_at = pool.created_at;
            this.token_id = pool.token_id;
        }
    }


    /*                  */
    /* CRUD OPERATIONS  */
    /*                  */
    async create(
        pool: Pool
    ): Promise<Pool | null> {

        const params = [
            pool.group_id,
            pool.minting_contract_address,
            pool.chain_id,

            pool.token_id,
        ]


        const results = await db.query(
            "INSERT INTO `pool` (group_id, minting_contract_address,  chain_id, token_id, created_at) VALUES (?, ?, ?,  ?, UTC_TIMESTAMP());",
            params
        );
        if ("insertId" in results) {
            const pool = await db.query(
                "SELECT * FROM `pool` WHERE id = ?",
                [results.insertId]
            );
            if (pool.length > 0) {
                return pool[0] as Pool;
            }
        }

        return null;
    }

    async read(): Promise<Pool[] | null> {
        const pool = await db.query(
            "SELECT * FROM `pool`",
            []
        );
        if (pool.length > 0) {
            return pool as Pool[];
        }
        else return null
    }






    readAllPoolsForGroup = async (groupId: string): Promise<Pool[] | { id: null }> => {
        const promise = new Promise<Pool[] | { id: null }>((resolve, reject) => {
            if (groupId) {
                MySQL.pool.getConnection((err, db) => {
                    db.execute(
                        "select * from `pool` where group_id = ?",
                        [groupId],
                        (err: any, results: any, fields: any) => {
                            if (err) {
                                reject(new ApiError(500, err));
                            } else if (results.length < 1) {
                                resolve({ id: null });
                            } else {
                                // Map the RowDataPacket array to your Group type directly
                                const pools: Pool[] = results.map((row: RowDataPacket) => ({
                                    id: row.id,
                                    group_id: row.group_id,
                                    minting_contract_address: row.minting_contract_address,
                                    created_at: row.created_at,
                                    chain_id: row.chain_id
                                }));

                                resolve(pools);
                            }
                            db.release();
                        }
                    );
                });
            } else {
                reject(new ApiError(500, "Missing group id to fetch all pools"));
            }
        });
        return promise;
    };



    delete = async (id: number): Promise<void> => {
        const promise = new Promise<void>((resolve, reject) => {
            if (id) {
                MySQL.pool.getConnection((err, db) => {
                    db.execute(
                        "delete from `pool` where `id` = ?",
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

export default Pool;
