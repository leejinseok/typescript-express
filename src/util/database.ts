import {Connection, createConnection} from "typeorm";

class DatabaseUtil {
  constructor() {}

  static async getConnection(entities: any[]): Promise<Connection> {
    return new Promise((resolve, reject) => {
      createConnection({
        type: "mysql",
        host: "localhost",
        port: 3307,
        username: "root",
        password: "1111",
        database: "blog",
        entities,
        synchronize: true,
      }).then(connection => {
        // here you can start to work with your entities
        resolve(connection);
      }).catch(error => reject(error));
    })
  }
}

export default DatabaseUtil;

