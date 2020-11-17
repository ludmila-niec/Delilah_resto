module.exports = {
    validateNewFavouriteInput: (req, res, next) => {
        const { product_id } = req.body;
        if (product_id) {
            return next();
        } else {
            return res.status(400).send("Error: Datos incompletos");
        }
    },
};
