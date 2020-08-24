const {
    getAllOrders,
    getOrder,
    saveOrder,
    saveProductOrder,
} = require("../repo/order.repo");

module.exports = {
    getOrders: async (req, res) => {
        try {
            let orders = await getAllOrders();
            res.status(200).json({ success: true, data: orders });
        } catch (error) {
            res.status(500).send("Error en el servidor");
        }
    },
    getOneOrder: async (req, res) => {
        try {
            let orderId = req.params.orderid;
            let orderById = await getOrder(orderId);
            if (!orderById) {
                return res.status(404).json({
                    success: false,
                    message: "No se encontre la orden",
                });
            }
            res.status(200).json({ success: true, data: orderById });
        } catch (error) {
            res.status(500).send("Error en el servidor");
        }
    },
    createOrder: async (req, res) => {
        try {
            let userId = req.userId;
            console.log("id del usuario");
            console.log(userId);
            let body = req.body;
            //validaciones antes de enviar el body
            //guardar user order
            let orderCreated = await saveOrder(body, userId);
            let orderId = orderCreated.order_id;
            let productDetail = body.detail;
            //guardar los productos detallados
            let productOrderCreated = await saveProductOrder(
                orderId,
                productDetail
            );
            console.log("detalle de los productos");
            console.log((productOrderCreated));
            //en las respuesta agregar el numero de orden para seguir
            res.status(201).json({
                success: true,
                message: "Recibimos tu pedido",
                data: orderCreated,
            });
        } catch (error) {
            res.status(500).send("Error en el servidor");
        }
    },
};
