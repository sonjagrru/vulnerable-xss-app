const db = require('../db');

function getImageById(imageId, callback) {
  const q = `
    SELECT images.id, images.url, images.description, users.full_name
    FROM images
    JOIN users ON images.user_id = users.id
    WHERE images.id = ?
  `;
  db.query(q, [imageId], (err, result) => {
    if (err || result.length === 0) return callback(err || new Error('Not found'));
    callback(null, result[0]); // ⚠️ XSS ranjivo – opis ide direktno
  });
}

function getCommentsByImage(imageId, callback) {
  const q = `
    SELECT comments.content, users.full_name
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE comments.image_id = ?
  `;
  db.query(q, [imageId], (err, results) => {
    if (err) return callback(err);
    callback(null, results); // ⚠️ XSS ranjivo – content ide direktno
  });
}

function addComment(imageId, email, content, callback) {
  const getUserId = `SELECT id FROM users WHERE email = ?`;

  db.query(getUserId, [email], (err, result) => {
    if (err || result.length === 0) return callback(err || new Error('User not found'));

    const userId = result[0].id;

    const insert = `
      INSERT INTO comments (image_id, user_id, content)
      VALUES (?, ?, ?)
    `;
    db.query(insert, [imageId, userId, content], (err2) => {
      if (err2) return callback(err2);
      callback(null);
    });
  });
}

module.exports = {
  getImageById,
  getCommentsByImage,
  addComment,
};