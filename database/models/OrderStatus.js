const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const OrderStatus = sequelize.define(
    "OrderStatus",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.ENUM,
            values: [
                "NUEVO",
                "CONFIRMADO",
                "PREPARANDO",
                "ENVIANDO",
                "ENTREGADO",
                "CANCELADO",
            ],
            allowNull: false,
            defaultValue: "NUEVO",
        },
        code: {
            type: DataTypes.ENUM,
            values: ["NEW", "OK", "INPREP", "SHIP", "DELIV", "CANCEL"],
        },
    },
    { tableName: "order_status" }
);

module.exports = OrderStatus;
