const Product = require("../database/models/Product");

module.exports = {
    getProducts: async function () {
        try {
            let products = await Product.findAll();
            return products;
        } catch (error) {
            console.log(error);
        }
    },
    createProduct: async (name, price) => {
        try {
            let newProduct = await Product.create({
                name: name,
                price: price,
            });
            return newProduct;
        } catch (error) {
            console.log(error);
        }
    },
    modifyProduct: async (name, price, id) => {
        try {
            let updatedProduct = await Product.update(
                {
                    name: name,
                    price: price,
                },
                {
                    where: {
                        product_id: id,
                    },
                }
            );
            return updatedProduct;
        } catch (error) {
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
            return deleteProduct
        } catch (error) {
            console.log(error);
        }
    },
};
