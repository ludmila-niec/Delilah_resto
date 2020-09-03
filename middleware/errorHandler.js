const { ValidationError } = require("sequelize");
module.exports = {
    validationError: (err, req, res, next) => {
        if (err instanceof ValidationError) {
            console.log("entre error validation handler");
            let message = "";
            err.errors.forEach((error) => {
                message += error.message + "\n";
            });
            return res.status(400).send("Error:" + "\n" + message);
        }else{
            console.log(" no entre en el error handler");
            return next(err)
        }

    },
};
