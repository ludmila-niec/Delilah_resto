const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ProductCategory = sequelize.define(
    "ProductCategory",
    {
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /^[a-z _]+$/i,
                    msg: "El nombre de la categoria solo puede contener letras",
                },
                len: {
                    args: [3, 255],
                    msg: "El nombre de la debe contener al menos 3 letras",
                },
            },
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg:
                        "Por favor ingresa la url de la imagen de la categoria",
                },
            },
        },
    },
    {
        tableName: "product_category",
    }
);

module.exports = ProductCategory;
