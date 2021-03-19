module.exports = (sequelize, Sequelize) => {
  const BoardColumns = sequelize.define('boardColumns', {
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
    boardId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  BoardColumns.associate = models => {
    BoardColumns.belongsTo(models.boards, {
      as: 'bc',
      foreignKey: 'boardId',
    })
  }

  return BoardColumns;
};