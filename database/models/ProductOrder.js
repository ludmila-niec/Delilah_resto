const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../db");

const ProductOrder = sequelize.define("product_order", {
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allownull: false,
    },
});

module.exports = ProductOrder;
