const User = require("./User");
const Product = require("./Product");
const ProductCategory = require("./ProductCategory");
const UserOrder = require("./UserOrder");
const ProductOrder = require("./ProductOrder");
const Payment = require("./Payments");
const OrderStatus = require("./OrderStatus");
const { DataTypes } = require("sequelize");

User.hasMany(UserOrder, {
    foreignKey: { name: "user_id", type: DataTypes.INTEGER, allowNull: false },
});
UserOrder.belongsTo(User, {
    foreignKey: { name: "user_id", type: DataTypes.INTEGER, allowNull: false },
});

ProductCategory.hasMany(Product, {
    foreignKey: {
        name: "category_id",
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Payment.hasMany(UserOrder, {
    foreignKey: {
        name: "payment_id",
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
UserOrder.belongsTo(Payment, {
    foreignKey: {
        name: "payment_id",
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

OrderStatus.hasMany(UserOrder, {
    foreignKey: {
        name: "status_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});
UserOrder.belongsTo(OrderStatus, {
    foreignKey: {
        name: "status_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});
UserOrder.belongsToMany(Product, {
    as: "products",
    through: ProductOrder,
    foreignKey: "order_id",
    otherKey: "product_id",
});

Product.belongsToMany(UserOrder, {
    as: "orders",
    through: ProductOrder,
    foreignKey: "product_id",
    otherKey: "order_id",
});
