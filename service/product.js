const {
    getProducts,
    createProduct,
    modifyProduct,
    deleteProductById,
} = require("../repo/product.repo");

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
            if (newProduct.errors) {
                return next(newProduct.errors);
            }
            res.status(201).json({
                success: true,
                message: "Producto creado exitosamente!",
                data: newProduct,
            });
        } catch (error) {
            console.log("entre en service error");
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
                    message: "No se encontró el producto por id",
                });
            }
            if (productModified.errors) {
                return next(productModified.errors);
            }
            res.status(200).json({
                success: true,
                message: "Producto actualizado exitosamente!",
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
                return res.status(401).json({
                    success: false,
                    message: "No se encontró el producto por id",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Producto eliminado exitosamente",
            });
        } catch (error) {
            res.status(500).send("Error en servidor");
        }
    },
};
