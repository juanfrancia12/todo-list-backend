import { Sequelize } from "sequelize";
import config from "../config";

export const sequelize = new Sequelize(
  config.dbDatabase as string,
  config.dbUser as string,
  config.dbPassword as string,
  {
    host: config.dbServer as string,
    dialect: "postgres",
    // pool: {
    //   max: 5,
    //   min: 0,
    //   require: 30000,
    //   idle: 10000,
    // },
    // logging: false,
  }
);
