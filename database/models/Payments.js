const { DataTypes } = require("sequelize");
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
        name: {
            type: DataTypes.ENUM,
            values: ["EFECTIVO", "DEBITO", "CREDITO", "MERCADO PAGO"],
            allowNull: false,
        },
        code: {
            type: DataTypes.ENUM,
            values: ["EFT", "DBT", "CRDT", "MP"],
            allowNull: false,
        },
    },
    {
        tableName: "payments",
    }
);

module.exports = Payment;
