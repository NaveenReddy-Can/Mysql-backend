
const mysql = require("mysql2");
const fs = require('fs');
const path = require('path');
const conn = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "12345678Aa",
    database: "crud"
});


conn.connect((err) => {
    if (err) throw err;
    console.log("DB connected");
});


const conn1 = mysql.createConnection({ host: "wildb.mysql.database.azure.com", user: "mydemo", password: "Dotcom123!", database: "wilproject", port: 3306, ssl: { ca: fs.readFileSync(path.join(__dirname, 'cert', 'certt.pem')) } });
conn1.connect((err) => {
    if (err) throw err;
    console.log("DB2 connected");
});


module.exports = conn;
module.exports = conn1;