const {
    getAllOrders,
    getUserOrders,
    getOrder,
    checkRealProduct,
    saveOrder,
    saveProductOrder,
    changeStatus,
    deleteOrderById,
} = require("../repo/order.repo");
const { getUserById } = require("../repo/user.repo");

module.exports = {
    getOrders: async (req, res) => {
        try {
            //buscar usuario para saber si es tiene rol normal o admin
            let user = await getUserById(req.userId);
            //si es tiene rol normal, retornar sus ordenes pasadas
            if (!user.dataValues.isAdmin) {
                let userOrders = await getUserOrders(req.userId);
                return res
                    .status(200)
                    .json({ success: true, data: userOrders });
            }
            //si es admin, retorna todas las ordenes
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
            let body = req.body;
            //checkear que los id de los productos existan antes de guardar la orden
            let productValidacion = await checkRealProduct(body.detail);
            if (productValidacion.length > 0) {
                return res.status(404).json({
                    success: false,
                    message: "No se encontró el/los producto/s",
                });
            }
            //guardar user order
            let orderCreated = await saveOrder(body, userId);
            let orderId = orderCreated.order_id;
            let productDetail = body.detail;
            //guardar los productos detallados
            let productOrderCreated = await saveProductOrder(
                orderId,
                productDetail
            );

            res.status(201).json({
                success: true,
                message: "Recibimos tu pedido",
                order_num: orderCreated.order_id,
            });
        } catch (error) {
            res.status(500).send("Error en el servidor " + error);
        }
    },
    updateStatus: async (req, res) => {
        try {
            let orderId = req.params.orderid;
            let status = req.body.status_id;
            let orderUpdated = await changeStatus(orderId, status);
            if (orderUpdated[0] === 0) {
                return res.status(400).json({
                    success: false,
                    message: "No se encontró el numero de orden",
                });
            }
            res.status(200).json({
                success: true,
                message: "Estado de la orden actualizada",
            });
        } catch (error) {
            res.status(500).send(`Error en el servidor. ${error}`);
        }
    },
    deleteOrder: async (req, res) => {
        try {
            let orderId = req.params.orderid;
            let orderDeleted = await deleteOrderById(orderId);
            if (orderDeleted === 0) {
                return res.status(400).json({
                    success: false,
                    message: "No se encontró el id de la orden",
                });
            }
            res.status(200).json({
                success: true,
                message: `Numero de orden ${orderId} eliminada`,
            });
        } catch (error) {
            res.status(500).send(`Error en el servidor. ${error}`);
        }
    },
};
