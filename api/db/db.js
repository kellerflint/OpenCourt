import { Sequelize } from 'sequelize';
import chalk from 'chalk';        // only if you use chalk in logging

const DB_HOST =  '147.182.229.133';
const DB_USER =  'root';
const DB_PASS = 'blue123';
const DB_NAME =  'openCourt';
const DB_PORT = 3306;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: q => console.log(chalk ? chalk.blue(`SQL Query: ${q}`) : q), 
});

export async function initDB({ runSync = false } = {}) {
  await sequelize.authenticate();
  console.log('DB connected');
  if (runSync) {
    await sequelize.sync(); 
    console.log('Models synced');
  }
  await sequelize.sync({ alter: true });
}

export default sequelize;
