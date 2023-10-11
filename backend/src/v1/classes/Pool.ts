import MySQL from "../../MySQL";
import ApiError from "./ApiError";
import { OkPacket, QueryError, RowDataPacket } from "mysql2"


class Pool {
    id?: number;
    group_id?: number;
    minting_contract_address?: string;
    chain_id?: number;
    created_at?: Date;

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
        }
    }


    /*                  */
    /* CRUD OPERATIONS  */
    /*                  */
    create = async (): Promise<Pool> => {
        const pool = this;

        return new Promise<Pool>((resolve, reject) => {
            // Insert new row
            MySQL.pool.getConnection((err, db) => {
                if (err) {
                    reject(new ApiError(500, err.toString()));
                    return;
                }

                db.query(
                    "INSERT INTO `pool` (group_id, minting_contract_address, chain_id created_at) VALUES (?, ?, ?, UTC_TIMESTAMP());",
                    [pool.group_id, pool.minting_contract_address],
                    (err, results: RowDataPacket[], fields) => {
                        if (err) {
                            db.release();
                            reject(new ApiError(500, err.toString()));
                            return;
                        }

                        if ("insertId" in results) {
                            const poolId = results.insertId;
                            // Create a query to select the newly inserted group
                            db.query(
                                "SELECT * FROM `pool` WHERE id = ?",
                                [poolId],
                                (err, results: RowDataPacket[], fields) => {
                                    if (err) {
                                        db.release();
                                        reject(new ApiError(500, err.toString()));
                                        return;
                                    }

                                    const newPool = new Pool(results[0] as Pool);
                                    resolve(newPool);
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
