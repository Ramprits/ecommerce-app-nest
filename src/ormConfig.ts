import { ConnectionOptions } from "typeorm";

const ormConfig: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "plumtree",
  database: "mediumclone",
  entities: ["**/*.entity{.ts,.js}"],
  synchronize: false,
  migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
  cli: {
    migrationsDir: "src/migrations"
  }
};
export default ormConfig;