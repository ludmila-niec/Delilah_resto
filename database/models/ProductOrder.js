const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../db");
const UserOrder = require("./UserOrder");
const Product = require("./Product");

const ProductOrder = sequelize.define(
    "productOrders",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: UserOrder,
                key: "order_id",
            },
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: "product_id",
            },
        },
    },
    {
        tableName: "product_orders",
        createdAt: false,
        updatedAt: false,
    }
);

// UserOrder.belongsToMany(Product, {
//     through:ProductOrder
// });
// Product.belongsToMany(UserOrder, {
//     through: ProductOrder
// });

module.exports = ProductOrder;
