const MySQL = require("../../MySQL");
const ApiError = require("./ApiError");

class Group {
  constructor(group) {
    this.set(group);
  }

  set(group) {
    if (typeof group !== "undefined") {
      this.id = group.id;
      this.group_name = group.group_name;
      this.created_at = group.created_at;
    }
  }

  /*                  */
  /* CRUD OPERATIONS  */
  /*                  */
  create = async () => {
    const group = this;
    console.log(group, "wats group?");
    const promise = new Promise((resolve, reject) => {
      // Insert new row
      MySQL.pool.getConnection((err, db) => {
        db.query(
          "INSERT INTO `group` (group_name, created_at) VALUES (?,  UTC_TIMESTAMP());",
          [group.group_name],
          (err, results, fields) => {
            if (err) {
              reject(new ApiError(500, err));
            } else {
              console.log(group, "group resolved");
              resolve(group);
            }
            db.release();
          }
        );
      });
    });
    return promise;
  };

  read = async (id) => {
    const game = this;
    const promise = new Promise((resolve, reject) => {
      if (id) {
        MySQL.pool.getConnection((err, db) => {
          db.execute(
            "select * from `game` where user_id = ?",
            [id],
            (err, results, fields) => {
              if (err) {
                reject(new ApiError(500, err));
              } else if (results.length < 1) {
                reject(new ApiError(404, "Game not found"));
              } else {
                game.set(results[0]);
                resolve(game);
              }
              db.release();
            }
          );
        });
      } else {
        reject(new ApiError(500, "Missing game id"));
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

module.exports = Group;
