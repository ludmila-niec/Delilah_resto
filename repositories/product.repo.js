const Product = require("../database/models/Product");
const { ValidationError } = require("sequelize");
module.exports = {
    getProducts: async function () {
        try {
            let products = await Product.findAll();
            return products;
        } catch (error) {
            console.log(error);
        }
    },
    getProductById: async function (productId) {
        try {
            let product = await Product.findByPk(productId);
            return product;
        } catch (error) {
            console.log(error);
        }
    },
    createProduct: async (product) => {
        try {
            let newProduct = await Product.create({
                name: product.name,
                img: product.img,
                description: product.description,
                category_id: product.category_id,
                price: product.price,
            });
            return newProduct;
        } catch (error) {
            if (error instanceof ValidationError) {
                return error;
            }
            console.log(error);
        }
    },
    modifyProduct: async (product, id) => {
        try {
            let updatedProduct = await Product.update(
                {
                    name: product.name,
                    img: product.img,
                    description: product.description,
                    category_id: product.category,
                    price: product.price,
                },
                {
                    where: {
                        product_id: id,
                    },
                }
            );
            return updatedProduct;
        } catch (error) {
            if (error instanceof ValidationError) {
                return error;
            }
            console.log(error);
        }
    },
    deleteProductById: async (id) => {
        try {
            let deleteProduct = await Product.destroy({
                where: {
                    product_id: id,
                },
            });
            return deleteProduct;
        } catch (error) {
            console.log(error);
        }
    },
};
