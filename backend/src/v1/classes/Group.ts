import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import MySQL, { db } from '../../MySQL';
import ApiError from './ApiError';

class Group {
  id?: number;
  group_name?: string;
  created_at?: Date;
  public_address?: string;
  rewards?: number



  constructor(group?: Group) {
    if (group) {
      this.set(group);
    }
  }

  set(group: Group) {
    if (group !== undefined) {
      this.id = group.id;
      this.group_name = group.group_name;
      this.created_at = group.created_at;
      this.public_address = group.public_address;
      this.rewards = group.rewards;


    }
  }

  /*                  */
  /* CRUD OPERATIONS  */
  /*                  */
  create = async (): Promise<Group | undefined> => {
    const group = this;
    return new Promise<Group | undefined>((resolve, reject) => {
      // Insert new row
      MySQL.pool.getConnection((err, db) => {
        db.query(
          "INSERT INTO `group` (group_name, public_address, rewards, created_at) VALUES (?, ?, ?,  UTC_TIMESTAMP());",
          [group.group_name, group.public_address, 0],
          (err, results, fields) => {
            if (err) {
              reject(new ApiError(500, err.toString()));
            } else {
              // Check if results is an OkPacket (type guard)
              if ("insertId" in results) {
                const groupId = results.insertId;
                // Create a query to select the newly inserted group
                db.query(
                  "SELECT * FROM `group` WHERE id = ?",
                  [groupId],
                  (err, results: RowDataPacket[], fields) => {
                    if (err) {
                      reject(new ApiError(500, err.toString()));
                    } else {
                      // Resolve with the selected group object
                      const newGroup = new Group(results[0] as Group);
                      resolve(newGroup);
                    }
                    db.release();
                  }
                );
              } else {
                // Handle the case where results is not an OkPacket
                reject(new ApiError(500, "Unexpected result format"));
                db.release();
              }
            }
            db.release();
          }
        );
      });
    });
  };



  async read(
    groupId: number,
  ): Promise<RowDataPacket | null> {
    // TODO: clean not required fields from the query
    const results = await db.query(
      "SELECT * FROM `group` WHERE id = ?",
      [groupId]
    );
    if (results.length > 0) {
      return results[0]
    }
    return null;
  }




  delete = async (id: number): Promise<void> => {
    const game = this;
    return new Promise<void>((resolve, reject) => {
      /*      if (id) {
             MySQL.pool.getConnection((err, db) => {
               db.execute(
                 "DELETE FROM `game` WHERE `id` = ?",
                 [id],
                 (err, results, fields) => {
                   if (err) {
                     reject(new ApiError(500, err));
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
             reject(new ApiError(400, "Missing game id"));
           } */
    });
  };
}

export default Group;
