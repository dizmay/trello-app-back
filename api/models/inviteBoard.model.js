module.exports = (sequelize, Sequelize) => {
  const InviteBoard = sequelize.define('inviteBoard', {
    reqUserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      }
    },
    resUserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      }
    },
    boardId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'boards',
        key: 'id',
      }
    },
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    }
  },
    {
      timestamps: false,
      freezeTableName: 'inviteBoard'
    })

  InviteBoard.associate = models => {
    InviteBoard.belongsTo(models.users, {
      as: 'resuser',
      foreignKey: 'resUserId',
    });
    InviteBoard.belongsTo(models.users, {
      as: 'requser',
      foreignKey: 'reqUserId',
    })
    InviteBoard.belongsTo(models.boards, {
      foreignKey: 'boardId',
      as: 'b',
    });
  };

  return InviteBoard;
}