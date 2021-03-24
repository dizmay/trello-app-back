module.exports = (sequelize, Sequelize) => {
  const ColumnsTasks = sequelize.define('columnsTasks', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    columnId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  ColumnsTasks.associate = models => {
    ColumnsTasks.belongsTo(models.boardColumns, {
      as: 'tasks',
      foreignKey: 'columnId',
    })
  }

  return ColumnsTasks;
};
