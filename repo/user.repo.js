const User = require("../database/models/User");
const { Op } = require("sequelize");

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
        // const realUser = await User.findOne({
        //     where: {
        //         [Op.or]: [{ username: data.user }, { email: data.user }],
        //     },
        // });

        return realUser;
    },
    getUserById: async (id) => {
        try {
            let user = await User.findByPk(id)
            if (!user) {
                throw new Error("No se encontró el usuario");
            }
            //devolver todos los atributos menos id y role
            return user;
        } catch (error) {
            console.log(error);
        }
    },
    getUserDetails: async (id) =>{
        try{

            let user = await User.findOne({
                where: { user_id: id },
                attributes: [
                    "username",
                    "password",
                    "firstName",
                    "lastName",
                    "email",
                    "phone",
                    "adress",
                ],
            });
            return user
        }catch(error){
            console.log(error);
        }
    },
    getAllUsers: async () => {
        try {
            let users = await User.findAll();
            return users;
        } catch (error) {
            console.log(error);
           
        }
    },
};
