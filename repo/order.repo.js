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
            // let order = await UserOrder.findOne({
            //     attributes:["status","payment_method","ticket","delivery_adress"],
            //     where:{order_id:id}
            // });
            let order = await UserOrder.findOne({
                attributes: [
                    "status",
                    "payment_method",
                    "ticket",
                    "delivery_adress",
                ],
                where: { order_id: id },
                // include: {
                //     model: ProductOrder,
                //     as: "Details",
                //     attributes: [],
                //     include: {
                //         model: Product,
                //         attributes: ["name", "price"],
                //     },
                // },
                // }).then(order => {
                //     let productDetail = await ProductOrder.findAll({where: {order_id:id}})
                // })
            });
            console.log(order);
            return order;
        } catch (error) {
            console.log(error);
        }
    },
    saveOrder: async (order, userId) => {
        try {
            const itemsQuantity = order.detail.length;
            let userOrder = await UserOrder.create({
                items_quantity: itemsQuantity,
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
            let productOrderCreated;
            products.forEach(async (item) => {
                //buscar id del producto
                let productInfo = await Product.findOne({
                    where: { name: item },
                });
                console.log("id del producto");
                console.log(productId);
                productOrderCreated = await ProductOrder.create({
                    order_id: orderId,
                    product_id: productInfo.dataValues.product_id
                });
            });
            return productOrderCreated
        } catch (error) {
            console.log(error);
        }
    },
};
