const router = require("express").Router();
const Product = require("../database/models/Product");
const {
    showProducts,
    createNewProduct,
    updateProduct,
    deleteProduct
} = require("../service/product");

//retornar todos los productos
//accesible para usuarios y admin
router.get("/", showProducts);


//crear producto
//accesible solo admin
router.post("/", createNewProduct);


//modificar producto
//accesible solo admin
router.patch("/:idproduct", updateProduct);


//eliminar producto
//accesible solo admin
router.delete("/:idproduct", deleteProduct)


module.exports = router;
