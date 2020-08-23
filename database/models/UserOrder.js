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
        items_quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
        payment: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Payment,
                key: "payment_id",
            },
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "user_id",
            },
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
