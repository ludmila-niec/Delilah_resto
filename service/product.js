const {
    getProducts,
    createProduct,
    modifyProduct,
    deleteProductById,
} = require("../repositories/product.repo");

const {ValidationError} = require('sequelize')

module.exports = {
    showProducts: async (req, res) => {
        try {
            let products = await getProducts();
            res.status(200).json({ success: true, data: products });
        } catch (error) {
            res.status(500).send("Error en servidor");
        }
    },
    createNewProduct: async (req, res, next) => {
        try {
            let body = req.body;
            let newProduct = await createProduct(body.name, body.price);
            if (newProduct instanceof ValidationError) {
                return next(newProduct);
            }
            res.status(201).json({
                success: true,
                message: "Producto creado exitosamente!",
                data: newProduct,
            });
        } catch (error) {

            res.status(500).send("Error en servidor");
        }
    },
    updateProduct: async (req, res, next) => {
        const product = req.body;
        const productId = req.params.idproduct;
        try {
            let productModified = await modifyProduct(
                product.name,
                product.price,
                productId
            );
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
        const productId = req.params.idproduct;
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
