const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Product = sequelize.define(
    "Product",
    {
        product_id: {
            type: DataTypes.INTEGER,
            allownull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: {
                    args: true,
                    msg: "Este campo solo acepta letras",
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
                isInt: {
                    args: true,
                    msg: "El Precio solo debe contener numeros enteros",
                },
                notNull: {
                    args: true,
                    msg: "Por favor ingresa tu precio de tu producto",
                },
            },
        },
    },
    {
        tableName: "products",
    }
);

module.exports = Product;
