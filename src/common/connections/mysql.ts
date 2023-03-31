const mysql = require("mysql");

export class Mysql {
  public async connect() {
    try {
      await mysql.createConnection({
        host: process.env.HOST as string,
        user: process.env.USER as string,
        password: (process.env.USER as string) || "",
        database: process.env.DATABASE as string,
      });
      console.log("🔗 Connect MYSQL database success ".green.bgBlack);
    } catch (error) {
      console.error("❌ Connect MYSQL database fail".red, error);
    }
  }
}
