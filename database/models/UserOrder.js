const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../db");

const UserOrder = sequelize.define("user_Order", {
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    order_date: {
        type: DataTypes.DATETIME,
        defaultValue: Sequelize.NOW,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "Nuevo",
    },
    items_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    payment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    delivery_adress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = UserOrder;
