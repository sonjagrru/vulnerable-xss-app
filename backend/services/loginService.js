const db = require('../db');

const authenticate = (email, password) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
      if (err) return reject(err);
      if (results.length > 0) resolve(results[0]);
      else resolve(null);
    });
  });
};

module.exports = { authenticate };