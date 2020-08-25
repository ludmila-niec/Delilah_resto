const User = require("./User");
const Product = require("./Product");
const UserOrder = require("./UserOrder");
const ProductOrder = require("./ProductOrder");
const Payment = require("./Payments");
const { DataTypes } = require("sequelize");

//user has many orders
//An order belongs to one user
User.hasMany(UserOrder, {
    foreignKey: { name: "user_id", type: DataTypes.INTEGER, allowNull: false },
});
UserOrder.belongsTo(User, {
    foreignKey: { name: "user_id", type: DataTypes.INTEGER, allowNull: false },
});

// an order has many products
// product belongs to many orders
// UserOrder.belongsToMany(Product, {
//     as: "order",
//     through: ProductOrder,
//     foreignKey: "order_id",
//     targetKey:"product_id"
// });
UserOrder.belongsToMany(Product, {
    as: "products",
    through: ProductOrder,
    foreignKey: "order_id",
    otherKey:"product_id"
});
// Product.belongsToMany(UserOrder, {
//     as: "product",
//     through: ProductOrder,
//     foreignKey: "product_id",
//     targetKey:"order_id"
// });
Product.belongsToMany(UserOrder, {
    as: "orders",
    through: ProductOrder,
    foreignKey: "product_id",
    otherKey:"order_id"
});


// pedido tiene un detalle de pago
// un detalle de pago pertenece a un pedido
// Payment.hasOne(UserOrder, { as: "payment", foreignKey: "payment_id" });
// UserOrder.belongsTo(Payment, { as: "order", foreignKey: "payment_id" });
