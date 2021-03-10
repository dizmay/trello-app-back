module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING(64),
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false
  }
  });

  return Users;
};