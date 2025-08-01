const db = require('../db');

function getImagesFromFollowed(email) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT images.id, images.url, images.description,
             users.full_name, users.avatar_url
      FROM users
      JOIN followers ON followers.followed_id = users.id
      JOIN users AS current ON current.id = followers.follower_id
      JOIN images ON images.user_id = users.id
      WHERE current.email = ?
      ORDER BY images.id DESC;
    `;

    db.query(query, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results); // ❗ Ne procesira se tekst — sve ide sirovo
    });
  });
}

module.exports = { getImagesFromFollowed };