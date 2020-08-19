const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Product = sequelize.define(
    "Product",
    {
        id: {
            type: DataTypes.INTEGER,
            allownull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Por favor ingresa un Nombre para tu producto",
                },
                notNull: {
                    args: true,
                    msg: "Por favor ingresa un Nombre para tu producto",
                },
                len: {
                    args: [3, 255],
                    msg:
                        "El nombre del producto debe contener al menos 3 letras",
                },
            },
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: {
                    args: true,
                    msg: "El Precio solo debe contener numeros",
                },
                isInt: {
                    args: true,
                    msg: "El Precio solo debe contener numeros",
                },
                notNull: {
                    args: true,
                    msg: "Por favor ingresa tu precio de tu producto",
                },
            },
        },
    },
    {
        tablename: "products",
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = Product;

