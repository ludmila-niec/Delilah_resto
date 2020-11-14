const {
    getProducts,
    getProductById,
    getProductsByCategory,
    createProduct,
    createCategory,
    modifyProduct,
    deleteProductById,
} = require("../repositories/product.repo");

const { ValidationError } = require("sequelize");

module.exports = {
    showProducts: async (req, res) => {
        try {
            let products = await getProducts();
            res.status(200).json({ success: true, data: products });
        } catch (error) {
            res.status(500).send("Error en servidor");
        }
    },
    showProductById: async (req, res) => {
        try {
            const productId = req.params.productId;
            const productById = await getProductById(productId);
            if (!productById) {
                return res.status(404).json({
                    success: false,
                    message: "No se encontró el producto por id",
                });
            }
            return res.status(200).json({
                success: true,
                data: productById,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("Error en servidor");
        }
    },
    showProductsByCategory: async (req, res) => {
        try {
            let categoryId = req.params.categoryId;
            let products = await getProductsByCategory(categoryId);
            if (products.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No se encontraron productas para la categoria",
                });
            }
            return res.status(200).json({
                success: true,
                data: products,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("Error en servidor");
        }
    },
    createNewProduct: async (req, res, next) => {
        try {
            let productData = req.body;
            let newProduct = await createProduct(productData);
            if (newProduct instanceof ValidationError) {
                return next(newProduct);
            }
            res.status(201).json({
                success: true,
                message: "Producto creado exitosamente!",
                data: newProduct,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("Error en servidor");
        }
    },
    createNewCategory: async (req, res, next) => {
        try {
            const categoryData = req.body;
            const newCategory = await createCategory(categoryData);
            if (newCategory instanceof ValidationError) {
                return next(newCategory);
            }
            res.status(201).json({
                success: true,
                message: "Categoria creada exitosamente",
                data: newCategory,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("Error en el servidor.");
        }
    },
    updateProduct: async (req, res, next) => {
        const product = req.body;
        const productId = req.params.productId;
        try {
            let productModified = await modifyProduct(product, productId);
            console.log(productModified);
            if (productModified[0] === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No se encontró el producto",
                });
            }
            if (productModified instanceof ValidationError) {
                return next(productModified);
            }
            res.status(200).json({
                success: true,
                message: "Producto modificado exitosamente!",
                data: product,
            });
        } catch (error) {
            res.status(500).send("Error en servidor");
        }
    },
    deleteProduct: async (req, res) => {
        const productId = req.params.productId;
        try {
            let product = await deleteProductById(productId);
            if (product != 1) {
                return res.status(404).json({
                    success: false,
                    message: "No se encontró el producto",
                });
            }

            return res.status(200).json({
                success: true,
                message: `Producto con id ${productId} eliminado exitosamente`,
            });
        } catch (error) {
            res.status(500).send("Error en servidor");
        }
    },
};
