const router = require("express").Router();
const { authAdmin, authUser } = require("../middleware/auth");
const {
    showProducts,
    showProductById,
    showProductsByCategory,
    createNewProduct,
    createNewCategory,
    updateProduct,
    deleteProduct,
} = require("../service/product");
const {
    validateProductInput,
    validateNewCategoryInput,
} = require("../middleware/product");

//retornar todos los productos
//accesible para usuarios y admin
router.get("/", authUser, showProducts);

//retornar un producto por id
//accesible para usuarios y admin
router.get("/:productId", authUser, showProductById);

//retornar todos los productos por categoria
//accesible para usuarios y admin
router.get("/category/:categoryId", authUser, showProductsByCategory);

//crear producto
//accesible solo admin
router.post("/", authAdmin, validateProductInput, createNewProduct);

//crear categoria nueva para productos
//accesible solo admin
router.post(
    "/category",
    authAdmin,
    validateNewCategoryInput,
    createNewCategory
);

//modificar producto
//accesible solo admin
router.patch("/:productId", authAdmin, validateProductInput, updateProduct);

//eliminar producto
//accesible solo admin
router.delete("/:productId", authAdmin, deleteProduct);

module.exports = router;
