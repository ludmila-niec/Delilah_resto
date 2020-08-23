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

//an order has many products
//product belongs to many orders
// UserOrder.belongsToMany(Product, { through:"product_orders", uniqueKey:"order_id" });
// Product.belongsToMany(UserOrder, { through: "product_orders", uniqueKey:"product_id" });

//pedido tiene un detalle de pago
//un detalle de pago pertenece a un pedido
Payment.hasOne(UserOrder, { as: "payment", foreignKey: "payment_id" });
UserOrder.belongsTo(Payment, { as: "order", foreignKey: "payment_id" });
