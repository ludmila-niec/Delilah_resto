const UserOrder = require("../database/models/UserOrder");
const ProductOrder = require("../database/models/ProductOrder");
const Product = require("../database/models/Product");
const { Op } = require("sequelize");
const Payment = require("../database/models/Payments");
const User = require("../database/models/User");
const OrderStatus = require("../database/models/OrderStatus");

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
    getUserOrders: async (userId) => {
        try {
            let userOrders = await UserOrder.findAll({
                attributes: ["order_id"],
                where: { user_id: userId },
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
                ],
            });

            return userOrders;
        } catch (error) {
            console.log(error);
        }
    },
    getOrder: async (orderId, userId) => {
        //Usuario solo puede consultar un numero de pedido que le pertenezca
        try {
            let order = await UserOrder.findAll({
                attributes: [],
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
            let orderAmount = await ProductOrder.sum("product_price", {
                where: { order_id: orderId },
            });
            return { order, orderAmount };
        } catch (error) {
            console.log(error);
        }
    },
    checkRealProduct: async (products) => {
        try {
            let errors = [];
            for (const product of products) {
                let productId = await Product.findByPk(product.id);
                if (!productId) {
                    errors.push(productId);
                }
            }
            return errors;
        } catch (err) {
            console.log(err);
        }
    },
    saveOrder: async (order, userId) => {
        try {
            let userOrder = await UserOrder.create({
                payment_id: order.payment_method,
                user_id: userId,
            });
            return userOrder;
        } catch (error) {
            console.log(error);
        }
    },
    saveProductOrder: async (orderId, products) => {
        try {
            for (const product of products) {
                let productData = await Product.findByPk(product.id);
                const orderCreated = await ProductOrder.create({
                    product_price: productData.dataValues.price,
                    order_id: orderId,
                    product_id: product.id,
                    product_quantity: product.quantity,
                });
            }
            return true;
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
            return orderDeleted;
        } catch (error) {
            console.log(error);
        }
    },
};
