const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateRealUser } = require("../repo/user.repo");

module.exports = {
    login: async (req, res) => {
        let user = req.body;
        console.log("body en login");
        console.log(user);
        try {
            //check si existe usuario registrado por username o email
            let userExists = await validateRealUser(user);
            if (!userExists) {
                return res.status(400).json({
                   success:false,  message: "El usuario o email ingresado no es valido",
                });
            }

            //check password valido
            let passwordOk = await bcrypt.compare(
                user.password,
                userExists.password
            );
            if (!passwordOk) {
                return res.status(400).json({
                    success:false, message: "La contraseña ingresada es incorrecta",
                });
            }
            //generar token
            let token = jwt.sign({ id: userExists.user_id }, process.env.TOKEN_SECRET, {
                expiresIn: "1h",
            });
            return res.status(200).json({success:true, message:"Login exitoso",token});
        } catch (error) {
            console.log(error);
        }
    },
};
