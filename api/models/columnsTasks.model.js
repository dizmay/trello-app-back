module.exports = (sequelize, Sequelize) => {
  const ColumnsTasks = sequelize.define('columnsTasks', {
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
    description: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    boardId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  ColumnsTasks.associate = models => {
    ColumnsTasks.belongsTo(models.boardColumns, {
      foreignKey: 'boardId',
    })
  }

  return ColumnsTasks;
};
