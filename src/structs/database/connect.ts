const mysql = require("mysql");

export const connection = mysql.createConnection({
  host: process.env.HOST as string,
  user: process.env.USER as string,
  password: "",
  database: process.env.DATABASE as string,
});
