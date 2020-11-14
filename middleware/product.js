module.exports = {
    validateProductInput: (req, res, next) => {
        const { name, img, description, category_id, price } = req.body;

        if (name && img && description && category_id && price) {
            return next();
        } else {
            return res.status(400).send("Error: Datos incompletos");
        }
    },
    validateNewCategoryInput: (req, res, next) => {
        const { name, img } = req.body;
        if (name && img) {
            return next();
        } else {
            return res.status(400).send("Error: Datos incompletos");
        }
    },
};
