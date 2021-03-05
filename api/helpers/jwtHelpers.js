const jwt = require('jsonwebtoken');

const generateToken = ({ id, email }) => {
    const token = jwt.sign({ id, email }, process.env.SECRET, {
        expiresIn: process.env.EXPIRES_IN,
    })
    return { token };
};

module.exports = {
    generateToken,
};
