const {
    getFavourites,
    addFavourite,
    deleteFavourite,
} = require("../repositories/favourite.repo");

module.exports = {
    showFavourites: async (req, res) => {
        try {
            //id del usuario para buscar sus favoritos
            const userId = req.userId;
            const favourites = await getFavourites(userId);
            res.status(200).json({
                success: true,
                data: favourites,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(`Error en el servidor. ${error}`);
        }
    },
    addFavourite: async (req, res) => {
        try {
            //id del usuario para agregar producto por id a sus favoritos
            const userId = req.userId;
            const productId = req.body.product_id;
            const newFavourite = await addFavourite(userId, productId);
            return res.status(201).json({
                success: true,
                message: "favorito agregado exitosamente",
                data: newFavourite,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(`Error en el servidor. ${error}`);
        }
    },
    deleteFavourite: async (req, res) => {
        try {
            //id del usuario para eliminar producto por id a sus favoritos
            const userId = req.userId;
            const productId = req.params.productId;
            const deletedFavourite = await deleteFavourite(userId, productId);
            if (deletedFavourite != 1) {
                return res.status(404).json({
                    success: false,
                    message: "No se encontró el producto",
                });
            }
            return res.status(200).json({
                success: true,
                message: "Favorito eliminado exitosamente",
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(`Error en el servidor. ${error}`);
        }
    },
};
