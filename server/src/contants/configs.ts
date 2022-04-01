import {config} from 'dotenv';

config();

// const HOST_DB = process.env.HOST_DB;
// const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
// const NYSQL_USER = process.env.MYSQL_USER;
// const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;


export const configs = {
    MYSQL_DATABASE_NAME: process.env.MYSQL_DATABASE_NAME,
    PORT: process.env.PORT || 5000,
    HOST: process.env.HOST,
};
