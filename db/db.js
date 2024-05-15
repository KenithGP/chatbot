require('dotenv').config();
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize')

dotenv.config({ path: '../segurit.env' });

const dbConnect = new Sequelize({
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: '',
    port: '3306',
    database: 'chatbot',
    logging: false,
    dialectOptions: process.env.NODE_ENV === 'production'? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {},
  });
  module.exports = {dbConnect};