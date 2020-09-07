const jwt   = require("jsonwebtoken");
const { getUserById } = require("../repositories/user.repo");

module.exports = {
    authUser: async (req, res, next) => {
        try {
            const token = req.header("Authorization").split(" ")[1];
            let user = await jwt.verify(token, process.env.TOKEN_SECRET);
            req.userId = user.id;
            return next();
        } catch (error) {
            if (jwt.TokenExpiredError) {
                return res
                    .status(401)
                    .send("Error: Token invalido/vencido. Tenes que iniciar sesión");
            }
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
            //buscar usuario por id para checkear el rol
            let findUser = await getUserById(user.id);
            if (!findUser) {
                return res.status(404).send("No se encontró el id del usuario");
            }
            if (findUser.isAdmin) {
                return next();
            } else {
                return res
                    .status(403)
                    .send(
                        "No tenes autorización para acceder a este contenido"
                    );
            }
        } catch (error) {
            if (jwt.TokenExpiredError) {
                return res
                    .status(401)
                    .send(
                        "Error: Token invalido/vencido. Tenes que iniciar sesión"
                    );
            }
            return res
                .status(401)
                .send("Necesitas Autenticarte para acceder a este contenido");
        }
    },
};
