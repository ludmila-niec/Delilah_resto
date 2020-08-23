const { DataTypes, Sequelize, DATE } = require("sequelize");
const sequelize = require("../db");

const Payment = sequelize.define(
    "Payment",
    {
        payment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "payments",
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = Payment;
