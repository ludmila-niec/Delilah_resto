const User = require("../database/models/User");
const Favourite = require("../database/models/Favourites");
const Product = require("../database/models/Product");
const { Op } = require("sequelize");

module.exports = {
    getFavourites: async (userId) => {
        try {
            const favourites = await User.findOne({
                attributes: [],
                where: { user_id: userId },
                include: [
                    {
                        model: Product,
                        as: "products",
                        required: false,
                        through: {
                            model: Favourite,
                            as: "favourites",
                            attributes: [],
                        },
                    },
                ],
            });
            return favourites;
        } catch (error) {
            console.log(error);
        }
    },
    addFavourite: async (userId, productId) => {
        try {
            const newFavourite = await Favourite.create({
                user_id: userId,
                product_id: productId,
            });
            return newFavourite;
        } catch (error) {
            console.log(error);
        }
    },
    deleteFavourite: async (userId, productId) => {
        try {
            const deletedFavourite = await Favourite.destroy({
                where: {
                    [Op.and]: [{ user_id: userId }, { product_id: productId }],
                },
            });
            return deletedFavourite;
        } catch (error) {
            console.log(error);
        }
    },
};
