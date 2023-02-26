const config = require('../config.json');

const mysql = require('mysql');

const connection = mysql.createConnection({
  connectionLimit: 10,
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
});

// Postgres connection 
const getPlants = () => {
    return new Promise(function(resolve, reject) {
      connection.query('SELECT * FROM plant', (error, results, fields) => {
        if (error) {
          reject(error)
        }
        
        resolve(results);
      })
    });
  }
  
module.exports = {
getPlants
}