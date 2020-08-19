const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isLowercase: {
                    args: true,
                    msg: "El username debe estar en miniscula",
                },
                notEmpty: {
                    args: true,
                    msg: "Por favor ingresa un username",
                },
                notNull: {
                    args: true,
                    msg: "Por favor ingresa un username",
                },
                isAlphanumeric: {
                    args: true,
                    msg: "Username solo puede contener letras",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Por favor ingresa una contraseña",
                },
                notNull: {
                    args: true,
                    msg: "Por favor ingresa una comtraseña",
                },
                len: {
                    args: [6, 255],
                    msg: "La contraseña debe contener al menos 6 caracteres",
                },
            },
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: {
                    args: true,
                    msg: "El Nombre solo puede contener letras",
                },
                len: {
                    args: [3, 255],
                    msg: "El Nombre debe contener al menos 3 letras ",
                },
                notEmpty: {
                    args: true,
                    msg: "Por favor ingresa un Nombre",
                },
                notNull: {
                    args: true,
                    msg: "Por favor ingresa un Nombre",
                },
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: {
                    args: true,
                    msg: "El Apellido solo puede contener letras",
                },
                len: {
                    args: [3, 255],
                    msg: "El Apellido debe contener al menos 3 letras ",
                },
                notEmpty: {
                    args: true,
                    msg: "Por favor ingresa un Apellido",
                },
                notNull: {
                    args: true,
                    msg: "Por favor ingresa un Apellido",
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Por favor ingresa un email válido",
                },
                isLowercase: {
                    args: true,
                    msg: "El Email debe estar en miniscula",
                },
                notNull: {
                    args: true,
                    msg: "Por favor ingresa un Email",
                },
            },
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: {
                    args: true,
                    msg: "El numero de telefono solo debe contener numeros",
                },
                isInt: {
                    args: true,
                    msg: "El numero de telefono solo debe contener numeros",
                },
                notNull: {
                    args: true,
                    msg: "Por favor ingresa tu numero de telefono",
                },
                len: {
                    args: [9, 20],
                    msg: "Por favor ingresa un numero de telefono válido",
                },
            },
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Por favor ingresa una dirección",
                },
                notNull: {
                    args: true,
                    msg: "Por favor ingresa una dirección",
                },
            },
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                isInt: {
                    args: true,
                    msg: "Solo se aceptan numeros enteros",
                },
            },
        },
    },
    {
        tablename: "users",
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = User;

//rol 0 = usuario
//rol 1 = admin
