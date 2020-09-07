const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ValidationError } = require("sequelize");
const {
    validateUserName,
    validateEmail,
    create, validateRealUser
} = require("../repositories/user.repo");


module.exports = {
    createNewUser: async (req, res, next) => {
        const body = req.body;
        try {
            //checkear si el username ya se encuentra registrado
            let usernameExists = await validateUserName(body.username);
            if (usernameExists) {
                return res.status(409).json({
                    success: false,
                    message:
                        "El nombre de usuario ingresado ya se encuentra registrado",
                });
            }
            //checkear si el email ya se encuentra registrado
            let emailExists = await validateEmail(body.email);
            if (emailExists) {
                return res.status(409).json({
                    message: "El email ingresado ya se encuentra registrado",
                });
            }

            //hash password
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password, salt);

            //guardar nuevo usuario en la base de datos
            let newUser = await create(body);
            if (newUser instanceof ValidationError) {
                return next(newUser);
            }
            return res.status(201).json({
                success: true,
                message: "Usuario registrado exitosamente",
                data: body,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Ocurrio un error en el servidor",
            });
        }
    },
    login: async (req, res) => {
        let user = req.body;
        try {
            //check si existe usuario registrado por username o email
            let userExists = await validateRealUser(user);
            if (!userExists) {
                return res.status(400).json({
                    success: false,
                    message: "El usuario o email ingresado no es valido",
                });
            }

            //check password valido
            let passwordOk = await bcrypt.compare(
                user.password,
                userExists.password
            );
            if (!passwordOk) {
                return res.status(400).json({
                    success: false,
                    message: "La contraseña ingresada es incorrecta",
                });
            }
            //generar token
            let token = jwt.sign(
                { id: userExists.user_id },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: "1h",
                }
            );
            return res
                .status(200)
                .json({ success: true, message: "Login exitoso", token });
        } catch (error) {
            console.log(error);
        }
    },
};
