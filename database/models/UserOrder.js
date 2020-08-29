const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const UserOrder = sequelize.define(
    "userOrder",
    {
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
    },
    {
        tableName: "user_orders",
    }
);

module.exports = UserOrder;
