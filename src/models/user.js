const db = require('../database');

class User {
  static create(name, email, password, callback) {
    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.run(query, [name, email, password], function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, this.lastID);
      }
    });
  }

  static findByEmail(email, callback) {
    const query = `SELECT * FROM users WHERE email = ?`;
    db.get(query, [email], (err, row) => {
      callback(err, row);
    });
  }
}

module.exports = User;