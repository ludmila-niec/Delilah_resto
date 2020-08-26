const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ProductOrder = sequelize.define(
    "ProductOrders",
    {
        product_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
    },
    {
        tableName: "product_orders",
    }
);

module.exports = ProductOrder;
