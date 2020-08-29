module.exports = {
    validatorError: (err, req, res, next) => {
        let message = "";
        err.forEach((error) => {
            message += error.message + "\n";
        });
        res.status(400).send("Error:" + "\n" + message);
    },
};
