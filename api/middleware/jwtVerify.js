const jwt = require('jsonwebtoken');
const { unauthorizedError, tokenNotValidError } = require('../services/errorHandlers');

const jwtVerify = (req, res, next) => {
    try {
        if(!req.headers.Authorization) {
            throw new unauthorizedError();
        }

    const decoded = jwt.verify(req.headers.Authorization, process.env.SECRET);
    next()
    }
    catch(error) {
        throw new tokenNotValidError();
    }
}

module.exports = jwtVerify;
