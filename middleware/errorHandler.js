const { ValidationError } = require("sequelize");
module.exports = {
    validationError: (err, req, res, next) => {
        if (err instanceof ValidationError) {
            let message = "";
            err.errors.forEach((error) => {
                message += error.message + "\n";
            });
            return res.status(400).send("Error:" + "\n" + message);
        } else {
            return next(err);
        }
    },
};
