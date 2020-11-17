const router = require("express").Router();
const { authAdmin, authUser } = require("../middleware/auth");
const {
    showProducts,
    showProductById,
    createNewProduct,
    updateProduct,
    deleteProduct,
} = require("../service/product");
const { validateProductInput } = require("../middleware/product");

//retornar todos los productos
//accesible para usuarios y admin
router.get("/", authUser, showProducts);

//retornar un producto por id
//accesible para usuarios y admin
router.get("/:productId", authUser, showProductById);

//crear producto
//accesible solo admin
router.post("/", authAdmin, validateProductInput, createNewProduct);

//modificar producto
//accesible solo admin
router.patch("/:productId", authAdmin, validateProductInput, updateProduct);

//eliminar producto
//accesible solo admin
router.delete("/:productId", authAdmin, deleteProduct);

module.exports = router;
