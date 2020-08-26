const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ProductOrder = sequelize.define(
    "ProductOrders",
    {
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
