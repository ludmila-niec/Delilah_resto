const db = require("../database/db");
const User = require("../database/models/User");
const Op = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//REGISTER
//checkea si hay campos incompletos
module.exports.validateEmptyData = function (data) {
    const {
        username,
        password,
        firstName,
        lastName,
        email,
        phone,
        adress,
    } = data;
    if (
        username &&
        password &&
        firstName &&
        lastName &&
        email &&
        phone &&
        adress
    ) {
        return true;
    } else {
        return false;
    }
};

//checkea si el username ya esta registrado
module.exports.validateUsername = async function (username) {
    let usernameExists = await User.findOne({
        where: {
            username: username,
        },
    });
    if (usernameExists) {
        return false;
    } else {
        return true;
    }
};

//checkear si el email ya esta registrado
module.exports.validateEmail = async function (email) {
    let emailExists = await User.findOne({
        where: {
            email: email,
        },
    });
    if (emailExists) {
        return false;
    } else {
        return true;
    }
};

//encripta password
module.exports.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

//crea y guarda nuevo usuario en la base de datos
module.exports.createNewUser = async function (data) {
    const {
        username,
        firstName,
        lastName,
        email,
        phone,
        adress,
        password,
    } = data;

    let newUser = await User.create({
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        adress: adress,
        password: password,
    });
    if (newUser) {
        console.log(newUser);
        return true;
    } else {
        return false;
    }
};

//LOGIN
//checkea si existe usuario registrado con username o email ingresado en login
module.exports.validateRealUser = async function (data) {
    //login con usernama
    if (data.username) {
        let userExists = await User.findOne({
            where: { username: data.username },
        });
        return userExists;
    }
    //login con email
    if (data.email) {
        let userExists = await User.findOne({
            where: { email: data.email },
        });
        return userExists;
    }

    return null;
};

module.exports.checkValidPassword = async function (password, user) {
    console.log('validar');
    console.log(user);
    const passwordValido = await bcrypt.compare(password, user.password);
    if (passwordValido) {
        return true;
    } else {
        false;
    }
};

module.exports.generateToken = function (userId) {
    const token = jwt.sign({ id: userId }, process.env.TOKEN_SECRET);
    return token;
};
