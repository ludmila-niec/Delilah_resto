const { getUserById, getAllUsers} = require("../repo/user.repo");

module.exports = {
    getUserData: async (req, res) => {
        try {
            let userId = req.userId;
            let userData = await getUserById(userId);
            
            if (!userData.isAdmin) {
                // let userDetails = await getUserDetails(userId)
                return res.status(200).json({ success: true, data: userData });
            }
            //si es admin, retorna todos los usuarios
            if (userData.isAdmin) {
                let allUsers = await getAllUsers();
                return res.status(200).json({ success: true, data: allUsers });
            }
        } catch (error) {
            res.status(500).send("Error en el servidor");
        }
    },
    getOneUser: async (req, res) => {
        try{

            let userId = req.params.userId;
            let userData = await getUserById(userId);
            if (!userData) {
                return res
                    .status(404)
                    .json({ success: false, message: "No se encontró el usuario" });
            }
           return  res.status(200).json({ success: true, data: userData });
        }catch(error){
            console.log(error);
        }
    },
};
