const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Payment = require("./Payments");
const User = require("./User");

const UserOrder = sequelize.define(
    "userOrder",
    {
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        order_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "Nuevo",
            allowNull: false,
        },
        payment_method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ticket: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        delivery_adress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "user_orders",
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = UserOrder;
