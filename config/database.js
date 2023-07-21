const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(`postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

module.exports = { sequelize, Sequelize };
