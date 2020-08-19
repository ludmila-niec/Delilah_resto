const router = require("express").Router();
const User = require("../database/models/User");
const userService = require("../service/register_log");
const { validateEmptyInput } = require("../middleware/login");

//registrar usuario
//publico
router.post("/register", async (req, res) => {
    let username = user.username;
    let email = user.email;
    let password = user.password;
    try {
        //validar campos requeridos
        let userValidation = userService.validateEmptyData(user);
        if (!userValidation) {
            return res.status(400).json({
                Error: "Faltan completar campos en el registro de usuario",
            });
        }
        //checkear si el username ya se encuentra registrado
        let usernameExists = await userService.validateUsername(username);
        if (!usernameExists) {
            return res.status(400).json({
                Error:
                    "El nombre de usuario ingresado ya se encuentra registrado",
            });
        }

        //checkear si el email ya se encuentra registrado
        let emailExists = await userService.validateEmail(email);
        if (!emailExists) {
            return res.status(400).json({
                Error: "El email ingresado ya se encuentra registrado",
            });
        }

        //hash password
        let hashedPassword = await userService.hashPassword(password);
        user.password = hashedPassword;

        let userCreated = await userService.createNewUser(user);
        if (userCreated) {
            return res.status(201).json({
                message: "Usuario registrado exitosamente",
            });
        }
    } catch (err) {
        console.error(err.errors[0].message);
        res.status(400).json({ Error: err.errors[0].message });
        //luego checkear como era para pasar el error 500 con un handler general
    }
});

//iniciar sesion
//publico
router.post("/login",validateEmptyInput, async (req, res) => {
    let user = req.body;
    //puede ser email + password || username + password
    // let user = req.body;
    try {
        //check si existe usuario registrado por username o email
        let userExists = await userService.validateRealUser(user);
        if (!userExists) {
            return res
                .status(400)
                .json({ message: "El usuario o email ingresado no es valido" });
        }

        //check password valido
        let passwordOk = await userService.checkValidPassword(
            user.password,
            userExists
        );
        if (!passwordOk) {
            return res
                .status(400)
                .json({ message: "La contraseña ingresada es incorrecta" });
        }
        //si hay match user + pasword
        //mi user va a ser userExists
        //generar token
        let token = userService.generateToken(userExists.user_id);
        res.header("auth-token", token).send(token);
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;
