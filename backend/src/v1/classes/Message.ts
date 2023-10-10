import mysql, { Pool, Query, RowDataPacket } from "mysql2/promise"; // Use promise-based version
import ApiError from "./ApiError";
import MySQL from "../../MySQL";

class Message {
  id?: number;
  group_id?: number;
  sender?: string;
  text?: string;
  created_at?: Date;

  constructor(message: Partial<Message>) {
    this.set(message);
  }

  set(message: Partial<Message>) {
    if (message) {
      this.id = message.id;
      this.group_id = message.group_id;
      this.sender = message.sender;
      this.text = message.text;
      this.created_at = message.created_at;
    }
  }


  create = async (): Promise<Message | undefined> => {
    const message = this;
    return new Promise<Message | undefined>((resolve, reject) => {
      // Insert new row
      MySQL.pool.getConnection((err, db) => {
        db.query(
          "INSERT INTO `message` (group_id, sender, text, created_at) VALUES (?, ?, ?, UTC_TIMESTAMP());",
          [message.group_id, message.sender, message.text],
          (err, results, fields) => {
            if (err) {
              reject(new ApiError(500, err.toString()));
            } else {

              // Handle the case where results is not an OkPacket
              reject(new ApiError(500, "Unexpected result format"));
              db.release();
            }

            db.release();
          }
        );
      });
    });
  };

  readMessageByGroupId = async (groupId: number): Promise<Message | undefined> => {
    const message = this;
    if (groupId) {
      return new Promise<Message | undefined>((resolve, reject) => {
        // Insert new row
        MySQL.pool.getConnection((err, db) => {
          db.query(
            "SELECT * FROM `message` WHERE group_id = ? ORDER BY created_at ASC",
            [message.group_id,],
            (err, results, fields) => {
              if (err) {
                reject(new ApiError(500, err.toString()));
              } else {

                // Handle the case where results is not an OkPacket
                reject(new ApiError(500, "Unexpected result format"));
                db.release();
              }

              db.release();
            }
          );
        });
      });
    } else {
      throw new ApiError(500, "Missing group ID");
    }

  };



}

export default Message;
