module.exports = {
    validateProductInput: (req, res, next) => {
        const { name, price } = req.body;

        if (name && price) {
            return next();
        } else {
            return res.status(400).send("Error: Datos incompletos");
        }
    },
};
