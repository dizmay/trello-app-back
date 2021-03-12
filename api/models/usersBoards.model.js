module.exports = (sequelize, Sequelize) => {
  const UsersBoards = sequelize.define('usersBoards', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  boardId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'boards',
      key: 'id'
    }
  },
  },
  {
    timestamps: false,
  });

  return UsersBoards;
};
