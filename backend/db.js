const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "egzaminas",
    database: 'egzaminas',
    multipleStatements: true
});

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
};

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');

    // Call fetchDataAndInsert function when the server starts
    // fetchDataAndInsert();
});

module.exports = {
    connection,
    query
};