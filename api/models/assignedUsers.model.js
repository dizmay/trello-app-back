module.exports = (sequelize, Sequelize) => {
  const AssignedUsers = sequelize.define('assignedUsers', {
    taskId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    boardId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  AssignedUsers.associate = models => {
    AssignedUsers.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'au'
    })
    AssignedUsers.belongsTo(models.columnsTasks, {
      foreignKey: 'taskId',
      as: 'at'
    })
  }

  return AssignedUsers;
};
