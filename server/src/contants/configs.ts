import {config} from 'dotenv';

config();

export const configs = {
    MYSQL_DATABASE_NAME: process.env.MYSQL_DATABASE_NAME,
    PORT: process.env.PORT || 5000,
};
