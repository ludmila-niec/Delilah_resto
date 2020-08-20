const User = require("../database/models/User");

module.exports = {
    //checkea si el username ya esta registrado
    validateUserName: async (username) => {
        try {
            let usernameExists = await User.findOne({
                where: {
                    username: username,
                },
            });
            if (usernameExists) {
                return true;
            } else {
                false;
            }
        } catch (error) {
            console.log(error);
        }
    },
    //checkear si el email ya esta registrado
    validateEmail: async (email) => {
        let emailExists = await User.findOne({
            where: {
                email: email,
            },
        });
        if (emailExists) {
            return true;
        } else {
            false;
        }
    },
    //crea y guarda nuevo usuario en la base de datos
    create: async (data) => {
        const {
            username,
            firstName,
            lastName,
            email,
            phone,
            adress,
            password,
        } = data;
        try {
            let newUser = await User.create({
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                adress: adress,
                password: password,
            });
            if (!newUser) {
                return false;
            } else {
                return newUser;
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    validateRealUser: async (data) => {
        //login con usernama
        if (data.username) {
            let userExists = await User.findOne({
                where: {
                    username: data.username,
                },
            });
            return userExists;
        }
        //login con email
        if (data.email) {
            let userExists = await User.findOne({
                where: {
                    email: data.email,
                },
            });
            return userExists;
        }

        return null;
    },
    
};
