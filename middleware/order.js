module.exports = {
    validateOrderInput: (req, res, next) => {
        const { detail, payment_method } = req.body;
        if (detail && payment_method) {
            return next();
        } else {
            return res
                .status(400)
                .json({ success: false, message: "Faltan completar datos" });
        }
    },
    validateStatusInput: (req, res, next) => {
        const status = req.body;
        if (status) {
            return next();
        } else {
            return res
                .status(400)
                .json({ success: false, message: "Faltan completar datos" });
        }
    },
};
