const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database.js');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
});

// Sync the model with the database (create the table if it doesn't exist)
(async () => {
  try {
    await sequelize.sync();
    console.log('User model synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing User model:', error);
  }
})();

module.exports = User;
