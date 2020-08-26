const jwt = require("jsonwebtoken");
const { getUserById } = require("../repo/user.repo");
// check token en headers
module.exports = {
    authUser: async (req, res, next) => {
        try {
            const token = req.header("Authorization").split(" ")[1];
            let user = await jwt.verify(token, process.env.TOKEN_SECRET);
            req.userId = user.id;
            return next();
        } catch (error) {
            return res
                .status(401)
                .send("Necesitas autenticarte para acceder a este contenido");
        }
    },
    authAdmin: async (req, res, next) => {
        try {
            const token = req.header("Authorization").split(" ")[1];
            let user = await jwt.verify(token, process.env.TOKEN_SECRET);
            req.userId = user.id;
            //buscar usuario por id
            let findUser = await getUserById(user.id);
            if (!findUser) {
                return res.status(404).send("No se encontró el id del usuario");
            }
            //check si tiene rol de admin(1)
            if (findUser.isAdmin === true) {
                return next();
            } else {
                return res
                    .status(401)
                    .send(
                        "No tenes autorización para acceder a este contenido"
                    );
            }
        } catch (error) {
            return res
                .status(401)
                .send("Necesitas Autenticarte para acceder a este contenido");
        }
    },
};
