const UserOrder = require("../database/models/UserOrder");
const ProductOrder = require("../database/models/ProductOrder");
const Product = require("../database/models/Product");
const { Op } = require("sequelize");

module.exports = {
    getAllOrders: async () => {
        try {
            let orders = await UserOrder.findAll({
                include: [
                    {
                        model: Product,
                        as: "products",
                        attributes: ["name", "price"],
                        required: false,
                        through: {
                            model: ProductOrder,
                            as: "ProductOrders",
                            attributes: ["product_quantity"],
                        },
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
                attributes: [
                    "status",
                    "payment_method",
                    "ticket",
                    "delivery_adress",
                ],
                // where: { order_id: id },
                where: {
                    [Op.and]: [{ order_id: orderId }, { user_id: userId }],
                },
                include: [
                    {
                        model: Product,
                        as: "products",
                        attributes: ["name", "price"],
                        required: false,
                        through: {
                            model: ProductOrder,
                            as: "ProductOrders",
                            attributes: ["product_quantity"],
                        },
                    },
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
    checkRealProduct: async (products) =>{
        try{
             products.forEach(async (item) => {
                 let productId = await Product.findByPk(item.id);
                 if (!productId) {
                     return null;
                 }
             })
        }catch(error){
            console.log(error);
        }
    },
    saveOrder: async (order, userId) => {
        try {
            let userOrder = await UserOrder.create({
                payment_method: order.payment_method,
                ticket: order.ticket,
                user: userId,
                user_id: userId,
                delivery_adress: order.delivery_adress,
            });
            return userOrder;
        } catch (error) {
            console.log(error);
        }
    },
    saveProductOrder: async (orderId, products) => {
        try {
            products.forEach(async (item) => {
                // let productId = await Product.findByPk(item.id);
                // if (!productId) {
                //     return null;
                // }

                const orderCreated = await ProductOrder.create({
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
};
