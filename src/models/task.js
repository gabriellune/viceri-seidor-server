const db = require('../database');

class Task {
  static create(userId, description, priority, callback) {
    const query = `INSERT INTO tasks (userId, description, priority) VALUES (?, ?, ?)`;
    db.run(query, [userId, description, priority], function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, this.lastID);
      }
    });
  }

  static findByUserId(userId, callback) {
    const query = `SELECT * FROM tasks WHERE userId = ?`;
    db.all(query, [userId], (err, rows) => {
      callback(err, rows);
    });
  }
}

module.exports = Task;
