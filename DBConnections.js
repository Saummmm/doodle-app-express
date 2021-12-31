const mySQL = require("mysql");
//function to create connections
function newConn() {
  let conn = mySQL.createConnection({
    host: "34.72.75.147",
    user: "root",
    password: "mypassword",
    database: "DoodleDB",
  });
  return conn;
}

module.exports = newConn;
