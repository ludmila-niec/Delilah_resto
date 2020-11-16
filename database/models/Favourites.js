const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Favourite = sequelize.define(
    "favourites",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
    },
    { tableName: "favourites" }
);

module.exports = Favourite;
