module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING(20),
      allowNull: false,
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

  Users.associate = models => {
    Users.belongsToMany(models.boards, {
      through: 'usersBoards',
      foreignKey: 'userId',
    });
    Users.hasMany(models.inviteBoard, {
      as: 'resuser',
      foreignKey: 'resUserId',
    });
    Users.hasMany(models.inviteBoard, {
      as: 'requser',
      foreignKey: 'reqUserId',
    });
    Users.belongsToMany(models.columnsTasks, {
      through: 'assignedUsers',
      foreignKey: 'userId',
    });
    Users.hasMany(models.comments, {
      as: 'ucs',
      foreignKey: 'userId',
    });
  };

  return Users;
};
