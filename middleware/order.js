module.exports = {
    validateOrderInput: (req, res, next) => {
        const { detail, payment_method } = req.body;
        if (detail && payment_method) {
            return next();
        } else {
            return res.status(400).send("Error: Datos incompletos");
        }
    },
    validateStatusInput: (req, res, next) => {
        const status = req.body;
        if (status) {
            return next();
        } else {
            return res.status(400).send("Error: Datos incompletos");
        }
    },
};
