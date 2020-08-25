const UserOrder = require("../database/models/UserOrder");
const ProductOrder = require("../database/models/ProductOrder");
const Product = require("../database/models/Product");


module.exports = {
    getAllOrders: async () => {
        try {
            let orders = await UserOrder.findAll();
            return orders;
        } catch (error) {
            console.log(error);
        }
    },
    getOrder: async (id) => {
        //para role usuario algunos datos
        try {
            let order = await UserOrder.findAll({
                attributes: [
                    "status",
                    "payment_method",
                    "ticket",
                    "delivery_adress",
                ],
                where: { order_id: id },
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
            return order;
        } catch (error) {
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
                let productId = await Product.findByPk(item.id);
                if (!productId) {
                    return false;
                }
               
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
