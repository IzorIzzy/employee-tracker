const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'employee_tracker',
  password: 'Ready0517'
});

connection.connect(function (err){
    if (err) throw err;
});

module.exports = connection;