import { Sequelize } from 'sequelize';
import chalk from 'chalk'; 
import 'dotenv/config';

const DB_HOST = '147.182.229.133';
const DB_USER =  'root';
const DB_PASS = 'blue123';
const DB_NAME = 'openCourt';
const DB_PORT =  3306;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: query => console.log(chalk.blue(`SQL Query: ${query}`)),
 pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
});

try {
    // makes the connection to db - passes creds to db - acc or deny. Just comm to db
    await sequelize.authenticate();
    console.log('Connected successfully.');
    await sequelize.sync({alter: true});
} catch (error) {
    console.error('Unable to connect:', error);
}

export default sequelize;
