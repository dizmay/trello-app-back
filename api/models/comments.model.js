module.exports = (sequelize, Sequelize) => {
  const Comments = sequelize.define('comments', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    text: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    taskId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    boardId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    columnId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  });

  Comments.associate = models => {
    Comments.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'ucs',
    })
  }

  return Comments;
};
