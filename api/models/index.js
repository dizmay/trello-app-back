const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  define: {
    timestamps: false
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./users.model.js')(sequelize, Sequelize);
db.boards = require('./boards.model.js')(sequelize, Sequelize);
db.usersBoards = require('./usersBoards.model.js')(sequelize, Sequelize);
db.inviteBoard = require('./inviteBoard.model.js')(sequelize, Sequelize);
db.boardColumns = require('./boardColumns.model.js')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
