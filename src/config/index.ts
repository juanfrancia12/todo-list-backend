import { config } from "dotenv";
config();

export default {
  port: process.env.NODE_PORT || 4000,
  dbUser: process.env.NODE_DB_USER,
  dbPassword: process.env.NODE_DB_PASSWORD,
  dbServer: process.env.NODE_DB_SERVER,
  dbDatabase: process.env.NODE_DB_DATABASE,
};

export const SECRET_KEY = process.env.NODE_SECRET_KEY;
export const expiresIn = process.env.NODE_EXPIRES_IN;
export const JWT_ROUNDS = process.env.NODE_JWT_ROUNDS;

export const ID_ROLE_GENERAL = process.env.NODE_ID_ROLE_GENERAL;
export const ID_ROLE_ADMIN = process.env.NODE_ID_ROLE_ADMIN;

export const SEND_MAIL_USER = process.env.NODE_SEND_MAIL_USER;
export const SEND_MAIL_PASS = process.env.NODE_SEND_MAIL_PASS;
export const SEND_MAIL_FROM = process.env.NODE_SEND_MAIL_FROM;
export const SEND_MAIL_TO = process.env.NODE_SEND_MAIL_TO;