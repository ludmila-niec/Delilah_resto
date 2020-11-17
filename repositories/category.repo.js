const Product = require("../database/models/Product");
const ProductCategory = require("../database/models/ProductCategory");
const { ValidationError } = require("sequelize");

module.exports = {
    getCategories: async function () {
        try {
            let categories = await ProductCategory.findAll({
                include: [{ model: Product }],
            });
            return categories;
        } catch (error) {
            console.log(error);
        }
    },
    getProductsByCategory: async function (categoryId) {
        try {
            let products = await ProductCategory.findOne({
                where: { category_id: categoryId },
                include: [{ model: Product }],
            });
            return products;
        } catch (error) {
            console.log(error);
        }
    },
    createCategory: async function (category) {
        try {
            const newCategory = await ProductCategory.create({
                name: category.name,
                img: category.img,
            });
            return newCategory;
        } catch (error) {
            if (error instanceof ValidationError) {
                return error;
            }
            console.log(error);
        }
    },
};
