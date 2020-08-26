const router = require("express").Router();
const {
    getOrders,
    getOneOrder,
    createOrder,
    updateStatus,
} = require("../service/order");
const { authAdmin, authUser } = require("../middleware/auth");
// const Product = require("../database/models/Product");

//retornar todas las ordenes
//accesible solo admin
router.get("/", authAdmin, getOrders);

//retornar 1 pedido
//accesible user (solo si es su pedido) y admin
router.get("/:orderid", authUser, getOneOrder);

//crear pedido
//accesible user y admin
router.post("/", authUser, createOrder);

//modificar pedido
//accesible solo admin
router.put("/:orderid", async (req, res) => {});

//modificar estado del pedido
//accesible solo admin
router.patch("/:orderid", authAdmin, updateStatus);

//cancelar pedido
//accesible solo admin
router.delete("/:orderid", (req, res) => {});
module.exports = router;
