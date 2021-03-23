module.exports = (sequelize, Sequelize) => {
  const Boards = sequelize.define('boards', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
  });

  Boards.associate = models => {
    Boards.belongsToMany(models.users, {
      through: 'usersBoards',
      foreignKey: 'boardId',
    });
    Boards.hasMany(models.inviteBoard, {
      foreignKey: 'boardId',
    });
    Boards.hasMany(models.boardColumns, {
      foreignKey: 'boardId',
    })
  };

  return Boards;
};
