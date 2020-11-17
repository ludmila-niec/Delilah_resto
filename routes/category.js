const router = require("express").Router();
const { authAdmin, authUser } = require("../middleware/auth");
const {
    showCategories,
    showProductsByCategory,
    createNewCategory,
} = require("../service/category");
const { validateNewCategoryInput } = require("../middleware/product");

//retornar la lista de categoria
//accesible para usuarios y admin
router.get("/", authUser, showCategories);

//retornar todos los productos de una categoria por id
//accesible para usuarios y admin
router.get("/:categoryId", authUser, showProductsByCategory);

//crea categoria nueva para productos
//accesible solo admin
router.post("/", authAdmin, validateNewCategoryInput, createNewCategory);

module.exports = router;
