const router = require("express").Router();
const Product = require("../database/models/Product");
const { authAdmin, authUser } = require("../middleware/auth");
const {
    showProducts,
    createNewProduct,
    updateProduct,
    deleteProduct,
} = require("../service/product");

//retornar todos los productos
//accesible para usuarios y admin
router.get("/", authUser, showProducts);

//crear producto
//accesible solo admin
router.post("/", authAdmin, createNewProduct);

//modificar producto
//accesible solo admin
router.patch("/:idproduct", authAdmin, updateProduct);

//eliminar producto
//accesible solo admin
router.delete("/:idproduct", authAdmin, deleteProduct);

module.exports = router;
