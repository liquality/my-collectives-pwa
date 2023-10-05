const MySQL = require("../../MySQL");
const ApiError = require("./ApiError");

class Invite {
  constructor(invite) {
    this.set(invite);
  }

  set(invite) {
    if (typeof invite !== "undefined") {
      this.id = invite.id;
      this.group_id = invite.group_id;
      this.link = invite.link;
      this.is_used = invite.is_used;
      this.expiry_date = invite.expiry_date;
    }
  }

  /*                  */
  /* CRUD OPERATIONS  */
  /*                  */
  create = async () => {
    const invite = this;
    const inviteLink = this.generateInviteLink();
    const promise = new Promise((resolve, reject) => {
      // Insert new row
      MySQL.pool.getConnection((err, db) => {
        db.query(
          "INSERT INTO `invite` (group_id, invite_link, is_used, expiry_date) VALUES (?, ?, ?, UTC_TIMESTAMP());",
          [invite.group_id, inviteLink, false],
          (err, results, fields) => {
            if (err) {
              reject(new ApiError(500, err));
            } else {
              // Get the ID of the newly inserted invite
              const inviteId = results.insertId;

              // Create a query to select the newly inserted invite
              db.query(
                "SELECT * FROM `invite` WHERE id = ?",
                [inviteId],
                (err, results, fields) => {
                  if (err) {
                    reject(new ApiError(500, err));
                  } else {
                    // Resolve with the selected invite object
                    resolve(results[0]);
                  }
                  db.release();
                }
              );
            }
            db.release();
          }
        );
      });
    });
    return promise;
  };

  generateInviteLink = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let inviteLink = "";
    const linkLength = 10; // You can adjust the length as needed

    for (let i = 0; i < linkLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      inviteLink += characters.charAt(randomIndex);
    }

    return inviteLink;
  };

  read = async (invite_link) => {
    const invite = this;
    const promise = new Promise((resolve, reject) => {
      if (invite_link) {
        MySQL.pool.getConnection((err, db) => {
          db.execute(
            "select * from `invite` where invite_link = ?",
            [invite_link],
            (err, results, fields) => {
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
        reject(new ApiError(500, "Missing invite id/link"));
      }
    });
    return promise;
  };

  update = async () => {
    const game = this;
    const promise = new Promise((resolve, reject) => {
      MySQL.pool.getConnection((err, db) => {
        db.query(
          "UPDATE `game` SET status=?, user_id=?, level=?, artist_name=?, level_4_claimed_prizes=?, level_5_claimed_prizes=?, level_6_claimed_main_prize=?, claimable_prize_count=?, game_symbol_id=? WHERE id=?;",
          [
            game.status,
            game.user_id,
            game.level,
            game.artist_name,
            game.level_4_claimed_prizes,
            game.level_5_claimed_prizes,
            game.level_6_claimed_main_prize,
            game.claimable_prize_count,
            game.game_symbol_id,
            game.id,
          ],
          (err, results, fields) => {
            if (err) {
              reject(new ApiError(500, err));
            } else if (results.affectedRows < 1) {
              reject(new ApiError(404, "Game not found!"));
            } else {
              resolve(game);
            }
            db.release();
          }
        );
      });
    });
    return promise;
  };

  delete = async (id) => {
    const game = this;
    const promise = new Promise((resolve, reject) => {
      if (id) {
        this.MySQL.pool.getConnection((err, db) => {
          db.execute(
            "delete from `game` where `id` = ?",
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
      }
    });
    return promise;
  };
}

module.exports = Invite;
