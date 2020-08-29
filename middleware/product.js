module.exports = {
    validateProductInput: (req, res, next) => {
        const { name, price } = req.body;

        if (name && price) {
            return next();
        } else {
            return res
                .status(400)
                .json({ success: false, message: "Faltan completar datos" });
        }
    },
};
