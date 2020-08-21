const jwt = require("jsonwebtoken");
const { getUserById } = require("../repo/user.repo");
// check token en headers
module.exports = {
    authUser: async (req, res, next) => {
        const token = req.header("auth-token").split(' ')[1]
        try {
            let user = await jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = user.id;
            return next();
        } catch (error) {
            return res
                .status(401)
                .send("Necesitas Token para acceder a este contenido" + "\n"+ error);
        }
    },
    authAdmin: async (req, res, next) => {
        const token = req.header("auth-token").split(" ")[1];
       
        try {
            let user = await jwt.verify(token, process.env.TOKEN_SECRET);
            //buscar usuario por id
            let findUser = await getUserById(user.id);
            //check si tiene rol de admin(1)
            if (findUser.role === 1) {
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
                .send("Necesitas Token para acceder a este contenido" + error);
        }
    },
};
