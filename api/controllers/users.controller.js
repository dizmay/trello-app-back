const db = require("../models");
const { hashHelpers, jwtHelpers } = require('../helpers');
const errors = require('../services/errorHandlers/index');

const signup = async (req, res) => {

    const emailExists = await db.users.findOne({ where: { email: req.body.email } });
    const usernameExists = await db.users.findOne({ where: { username: req.body.username } });

    if(emailExists || usernameExists) {
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

    db.users.create(user, { transaction })
        .then(data => {
            res.send({ message: "You've been successfully signed up!" });
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
        throw new errors.notFoundError('User not found!');
    }

    if(password && !hashHelpers.validPassword(password, user.password)) {
        throw new errors.wrongPasswordError();
    } else {
        const response = jwtHelpers.generateToken({ email: req.body.email, username: user.username });
        res.status(200).send(response)
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
