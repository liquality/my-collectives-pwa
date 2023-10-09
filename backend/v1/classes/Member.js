const MySQL = require("../../MySQL");
const ApiError = require("./ApiError");
const Invite = require("./Invite");

class member {
  constructor(member) {
    this.set(member);
  }

  set(member) {
    if (typeof member !== "undefined") {
      this.inviteLink = member.inviteLink;
      this.address = member.address;
    }
  }

  /*                  */
  /* CRUD OPERATIONS  */
  /*                  */
  create = async () => {
    const member = this;
    const invite = new Invite();
    const {group_id: groupId} = await invite.read(member.inviteLink);

    const promise = new Promise((resolve, reject) => {
      // Insert new row
      MySQL.pool.getConnection((err, db) => {
        db.query(
          "INSERT INTO `member` (group_id, address) VALUES (?, ?);",
          [groupId, member.address],
          (err, results, fields) => {
            if (err) {
              reject(new ApiError(500, err));
            } else {
              // Get the ID of the newly inserted member
              const memberId = results.insertId;

              // Create a query to select the newly inserted member
              db.query(
                "SELECT * FROM `member` WHERE id = ?",
                [memberId],
                (err, results, fields) => {
                  if (err) {
                    reject(new ApiError(500, err));
                  } else {
                    // Resolve with the selected member object
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

  read = async (statusQuery) => {
    const member = this;
    const promise = new Promise((resolve, reject) => {
        MySQL.pool.getConnection((err, db) => {
          db.execute(
            "select * from `member` where status = ?",
            [statusQuery],
            (err, results, fields) => {
              if (err) {
                reject(new ApiError(500, err));
              } else if (results.length < 1) {
                resolve({ id: null });
              } else {
                member.set(results[0]);

                resolve(member);
              }
              db.release();
            }
          );
        });
    });
    return promise;
  };

  update = async (memberIds, status, isAcceptance) => {
    const promise = new Promise((resolve, reject) => {
      MySQL.pool.getConnection((err, db) => {
        db.query(
          "UPDATE `member` SET status=?, joined_at=  COALESCE(?, joined_at) WHERE id IN ?;",
          [
            status,
            isAcceptance ? UTC_TIMESTAMP() : null,
            [memberIds]
          ],
          (err, results, fields) => {
            if (err) {
              reject(new ApiError(500, err));
            } else if (results.affectedRows < 1) {
              reject(new ApiError(404, "Member not found!"));
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

}

module.exports = member;
