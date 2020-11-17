const {
    getCategories,
    getProductsByCategory,
    createCategory,
} = require("../repositories/category.repo");
const { ValidationError } = require("sequelize");
module.exports = {
    showCategories: async (req, res) => {
        try {
            const categories = await getCategories();
            return res.status(200).json({
                success: true,
                data: categories,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(`Error en el servidor. ${error}`);
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
            res.status(500).send(`Error en servidor. ${error}`);
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
            res.status(500).send(`Error en el servidor.. ${error}`);
        }
    },
};
