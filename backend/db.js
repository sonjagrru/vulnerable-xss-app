const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // tvoj user
  password: '1609999715050',  // tvoja lozinka
  database: 'xss_app'
});

db.connect((err) => {
  if (err) console.error('Greška:', err);
  else console.log('Povezan sa MySQL bazom!');
});

module.exports = db;