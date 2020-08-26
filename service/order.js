const {
    getAllOrders,
    getOrder,
    checkRealProduct,
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
            let userId = req.userId;
            let orderById = await getOrder(orderId, userId);
            if (!orderById) {
                return res.status(404).json({
                    success: false,
                    message: "No se encontró el pedido",
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
            //validaciones antes de enviar el body(si no estan vacios)
            //checkear que los id de los productos existan antes de guardar la orden
            // let productExists = await checkRealProduct(body.detail);
            // console.log("check producto existe");
            // console.log(productExists);
            // if (!productExists) {
            //     return res.status(404).json({
            //         success: false,
            //         message: "No se encontró el producto",
            //     });
            // }
            //guardar user order
            let orderCreated = await saveOrder(body, userId);
            let orderId = orderCreated.order_id;
            let productDetail = body.detail;
            //guardar los productos detallados
            let productOrderCreated = await saveProductOrder(
                orderId,
                productDetail
            );
            //en las respuesta agregar el numero de orden para seguir
            res.status(201).json({
                success: true,
                message: "Recibimos tu pedido",
                nro_pedido: orderCreated.order_id,
            });
        } catch (error) {
            res.status(500).send("Error en el servidor");
        }
    },
};
