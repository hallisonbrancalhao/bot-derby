import { MongoDB } from "./mongodb";
import { Mysql } from "./mysql";

const mongodb = new MongoDB();
const mysql = new Mysql();

class Loaders {
  public connect() {
    mongodb.connect();
    // mysql.connect();
  }
}

module.exports = new Loaders();
