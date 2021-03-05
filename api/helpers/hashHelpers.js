const bcrypt = require('bcryptjs');

const createHash = pass => bcrypt.genSalt(10).then(salt => bcrypt.hash(pass, salt));
  
const validPassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = {
    createHash,
    validPassword,
};
