const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
  }
);

sequelize
  .authenticate()
  .then(async () => {
    console.log('Connection to FreeSQLDatabase successful!');
    // Query the MySQL version
    const [result] = await sequelize.query('SELECT VERSION() as version');
    console.log('MySQL Version:', result[0].version);
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err.message);
  });