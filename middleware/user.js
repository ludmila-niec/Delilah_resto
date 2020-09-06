module.exports.validateRegisterInput = function (req, res, next) {
    const {
        username,
        password,
        firstName,
        lastName,
        email,
        phone,
        adress,
    } = req.body;
    if (
        username &&
        password &&
        firstName &&
        lastName &&
        email &&
        phone &&
        adress
    ) {
        return next();
    } else {
        return res.status(400).send("Error: Datos incompletos");
    }
};

//check que haya username y password || email y password para iniciar sesion
module.exports.validateLoginInput = function (req, res, next) {
    console.log("middleware");
    req.body;
    const { username, email, password } = req.body;
    if (username && password) {
        return next();
    }
    if (email && password) {
        return next();
    }
    return res.status(400).send("Error: Datos incompletos");
};
