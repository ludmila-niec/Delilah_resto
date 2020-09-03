const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define(
    "User",
    {
        user_id: {
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
                notEmpty: {
                    args: true,
                    msg: "El nombre de usuario no puede estar vacio",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "La contraseña no puede estar vacia",
                },
            },
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /^[a-z _]+$/i,
                    msg: "El nombre solo puede contener letras",
                },
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /^[a-z _]+$/i,
                    msg: "El apellido solo puede contener letras",
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
                    msg: "Ingresa un email válido",
                },
            },
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    args: true,
                    msg: "El numero de telefono solo debe contener numeros",
                },
            },
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "La direccion no puede estar vacia",
                },
            },
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    },
    {
        tableName: "users",
    }
);

module.exports = User;
