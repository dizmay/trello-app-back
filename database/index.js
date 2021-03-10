const db = require('../api/models');

const connectToDB = () => {
  db.sequelize.sync({ force: false }).then(() => {
    console.log('Done');
  });
}

module.exports = {
  connectToDB,
}