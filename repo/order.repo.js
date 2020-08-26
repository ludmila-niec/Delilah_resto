const UserOrder = require("../database/models/UserOrder");
const ProductOrder = require("../database/models/ProductOrder");
const Product = require("../database/models/Product");
const { Op } = require("sequelize");
const Payment = require("../database/models/Payments");
const User = require("../database/models/User");
const OrderStatus = require("../database/models/OrderStatus");
const order = require("../service/order");

module.exports = {
    getAllOrders: async () => {
        try {
            let orders = await UserOrder.findAll({
                attributes: ["order_id"],
                include: [
                    {
                        model: OrderStatus,
                        attributes: ["name"],
                    },
                    {
                        model: Product,
                        as: "products",
                        attributes: ["name"],
                        required: false,
                        through: {
                            model: ProductOrder,
                            as: "ProductOrders",
                            attributes: ["product_price", "product_quantity"],
                        },
                    },
                    { model: Payment, attributes: ["name"] },
                    {
                        model: User,
                        attributes: [
                            "adress",
                            "firstName",
                            "lastName",
                            "username",
                            "email",
                            "phone",
                        ],
                    },
                ],
            });
            return orders;
        } catch (error) {
            console.log(error);
        }
    },
    getOrder: async (orderId, userId) => {
        //Usuario solo puede consultar un numero de pedido que le pertenezca
        try {
            let order = await UserOrder.findAll({
                attributes: [],
                // where: { order_id: id },
                where: {
                    [Op.and]: [{ order_id: orderId }, { user_id: userId }],
                },

                include: [
                    {
                        model: OrderStatus,
                        attributes: ["name"],
                    },
                    {
                        model: Product,
                        as: "products",
                        attributes: ["name"],
                        required: false,
                        through: {
                            model: ProductOrder,
                            as: "ProductOrders",
                            attributes: ["product_price", "product_quantity"],
                        },
                    },
                    { model: Payment, attributes: ["name"] },
                    { model: User, attributes: ["adress"] },
                ],
            });
            console.log("orden final");
            console.log(order);
            if (order.length === 0) {
                return null;
            }
            return order;
        } catch (error) {
            console.log(error);
        }
    },
    checkRealProduct: async (products) => {
        try {
            products.forEach(async (item) => {
                let productId = await Product.findByPk(item.id);
                if (!productId) {
                    return null;
                }
            });
        } catch (error) {
            console.log(error);
        }
    },
    saveOrder: async (order, userId) => {
        try {
            let userOrder = await UserOrder.create({
                payment_id: order.payment_method,
                // user: userId,
                user_id: userId,
            });
            return userOrder;
        } catch (error) {
            console.log(error);
        }
    },
    saveProductOrder: async (orderId, products) => {
        try {
            products.forEach(async (item) => {
                let productData = await Product.findByPk(item.id);
                if (!productData) {
                    return null;
                }
                console.log("producto por id");
                console.log(productData);
                const orderCreated = await ProductOrder.create({
                    product_price: productData.dataValues.price,
                    order_id: orderId,
                    product_id: item.id,
                    product_quantity: item.quantity,
                });
                console.log(orderCreated);
            });
        } catch (error) {
            console.log(error);
        }
    },
    changeStatus: async (orderId, status) => {
        try {
            let orderUpdated = await UserOrder.update(
                {
                    status_id: status,
                },
                {
                    where: {
                        order_id: orderId,
                    },
                }
            );
            console.log(orderUpdated);
            return orderUpdated;
        } catch (error) {
            console.log(error);
        }
    },
    deleteOrderById: async (orderId) => {
        try {
            let orderDeleted = await UserOrder.destroy({
                where: {
                    order_id: orderId,
                },
            });
            console.log(orderDeleted);
            return orderDeleted;
        } catch (error) {
            console.log(error);
        }
    },
};
