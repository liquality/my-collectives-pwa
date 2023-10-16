/* import mysql, { Pool } from "mysql2";
import config from "./config";
import dotenv from "dotenv";

dotenv.config();

const mysqlConfig: mysql.PoolOptions = !process.env.MYSQLDATABASE
  ? config.database_connection
  : {
    host: process.env.MYSQLHOST as string,
    user: process.env.MYSQLUSER as string,
    database: process.env.MYSQLDATABASE as string,
    password: process.env.MYSQLPASSWORD as string,
    port: parseInt(process.env.MYSQLPORT as string),
    ...(process.env.SOCKETPATH && { socketPath: process.env.SOCKETPATH as string }),
  };

const pool: Pool = mysql.createPool(mysqlConfig);

export default pool;  */


import mysql, { Pool, PoolOptions, RowDataPacket } from "mysql2";
import config from "./config";
import dotenv from "dotenv";

dotenv.config();

const mysqlConfig: PoolOptions = !process.env.MYSQLDATABASE
  ? config.database_connection
  : {
    host: process.env.MYSQLHOST as string,
    user: process.env.MYSQLUSER as string,
    database: process.env.MYSQLDATABASE as string,
    password: process.env.MYSQLPASSWORD as string,
    port: parseInt(process.env.MYSQLPORT as string),
    ...(process.env.SOCKETPATH && { socketPath: process.env.SOCKETPATH as string }),
  };

const pool: Pool = mysql.createPool(mysqlConfig);

export const db = {
  query: async (sql: string, params: any[]): Promise<RowDataPacket[]> => {
    return new Promise<RowDataPacket[]>((resolve, reject) => {
      pool.getConnection((error, db) => {
        if(error) {
          reject(error);
        } else {
  
          db.query(
            sql,
            params,
            (err, results: RowDataPacket[], fields) => {
              if (err) {
                reject(err);
              } else {
                resolve(results);
              }
              db.release();
            }
          );
        }
      })
    });
    
  }
}

export default { pool }; 
