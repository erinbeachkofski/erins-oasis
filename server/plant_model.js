const config = require('../config.json');

const Pool = require('pg').Pool
const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
});

// Postgres connection 
const getPlants = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM plant', (error, results) => {
        if (error) {
          reject(error)
        }
        
        resolve(results.rows);
      })
    });
  }
  
module.exports = {
getPlants
}