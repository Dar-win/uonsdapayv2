import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Darwin1",
    database: "uonsda_pay",
    logging: true,
    synchronize: true,
    entities: [
        __dirname + "/../**/*.entity{.ts,.js}",
    ],
}

export default config