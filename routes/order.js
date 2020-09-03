const router = require("express").Router();
const {
    getOrders,
    getOneOrder,
    createOrder,
    updateStatus,
    deleteOrder,
} = require("../service/order");
const { authAdmin, authUser } = require("../middleware/auth");
const {
    validateOrderInput,
    validateStatusInput,
} = require("../middleware/order");

//accesible solo admin retornar todas las ordenes
//user solo sus ordenes pasadas
router.get("/", authUser, getOrders);

//retornar 1 pedido
//accesible user (solo si es su pedido) y admin
router.get("/:orderid", authUser, getOneOrder);

//crear pedido
//accesible user y admin
router.post("/", authUser, validateOrderInput, createOrder);

//modificar estado del pedido
//accesible solo admin
router.patch("/:orderid", authAdmin, validateStatusInput, updateStatus);

//eliminar pedido
//accesible solo admin
router.delete("/:orderid", authAdmin, deleteOrder);
module.exports = router;
