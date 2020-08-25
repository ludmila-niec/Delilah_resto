const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../db");
const UserOrder = require("./UserOrder");
const Product = require("./Product");
const { database } = require("../../config");

const ProductOrder = sequelize.define(
    "ProductOrders",
    {
        // order_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     unique: false,
        // },
        // product_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     unique: false,
        // },
        product_quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
    },
    {
        tableName: "product_orders",
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = ProductOrder;
