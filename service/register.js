const bcrypt = require("bcryptjs");
const {
    validateUserName,
    validateEmail,
    create,
} = require("../repo/user.repo");

module.exports = {
    createNewUser: async (req, res, next) => {
        const body = req.body;
        try {
            //checkear si el username ya se encuentra registrado
            let usernameExists = await validateUserName(body.username);
            if (usernameExists) {
                return res.status(400).json({
                    success: false,
                    message:
                        "El nombre de usuario ingresado ya se encuentra registrado",
                });
            }
            //checkear si el email ya se encuentra registrado
            let emailExists = await validateEmail(body.email);
            if (emailExists) {
                return res.status(400).json({
                    message: "El email ingresado ya se encuentra registrado",
                });
            }

            //hash password
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password, salt);

            //guardar nuevo usuario en la base de datos
            let newUser = await create(body);
            if (!newUser) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Error al intentar guardar nuevo usuario en la base de datos",
                });
            }
            if (newUser.errors) {
                return next(newUser.errors);
            }
            return res.status(201).json({
                success: true,
                message: "Usuario registrado exitosamente",
                data: body,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Ocurrio un error en la base de datos",
            });
        }
    },
};
