const db = require("../models");
const { hashHelpers, jwtHelpers } = require('../helpers');
const errors = require('../services/errorHandlers/index');
const Users = db.users;

const signup = async (req, res) => {

    const userExists = await db.users.findOne({ where: { email: req.body.email } });

    if(userExists) {
        throw new errors.userAlreadyExistsError();
    }

    const hashedPassword = await hashHelpers.createHash(req.body.password);
    const transaction = await db.sequelize.transaction();

    const user = {
        id: req.body.id,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    }

    Users.create(user, { transaction })
        .then(data => {
            res.send(data);
            transaction.commit();
        })
        .catch(err => {
            transaction.rollback();
            throw new errors.signupFailedError();
        })
};

const signin = async (req, res) => {

    const user = await db.users.findOne({ where: { email: req.body.email } });
    const password = req.body.password;

    if(!user) {
        throw new errors.notFoundError('User not found');
    }

    if(password && !hashHelpers.validPassword(password, user.password)) {
        throw new errors.wrongPasswordError();
    } else {
        const responce = jwtHelpers.generateToken({ email: req.body.email, username: req.body.username });
        res.status(200).send(responce)
    }


    // const id = req.params.id;

    // Users.findByPk(id)
    //     .then(data => {
    //         res.send(data);                                                        // FIND USER BY ID
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: `Error retrieving User with id = ${id}`,
    //         })
    //     })
};

// exports.update = (req, res) => {

// };

module.exports = {
    signup,
    signin,
}
