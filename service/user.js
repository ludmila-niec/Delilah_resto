const bcrypt = require("bcryptjs");
const { getUserById, getAllUsers, updateUserById, deleteUserById} = require("../repositories/user.repo");
const { ValidationError } = require("sequelize");

module.exports = {
    getUserData: async (req, res) => {
        try {
            const userId = req.userId;
            let userData = await getUserById(userId);
            
            if (!userData.isAdmin) {
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

            const userId = req.params.userId;
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
    updateUser: async (req, res, next) =>{
        try{
            let body = req.body
            const userid = req.userId
            //hash password
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password, salt);
            //guardar datos actualizados
            let updatedUser = await updateUserById(userid, body)
            //check si hay error en validacion
             if (updatedUser instanceof ValidationError) {
                 return next(updatedUser);
             }
             res.status(200).json({
                 success: true,
                 message: "Usuario modificado exitosamente!",
             });
        }catch(error){
            console.log(error);
            res.status(500).send("Error en servidor");
        }
    },
    deleteUser: async (req, res) => {
        const userId = req.params.userId
        try{
            let user = await deleteUserById(userId)
            if (user != 1) {
                return res.status(404).json({
                    success: false,
                    message: "No se encontró el usuario",
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Usuario eliminado exitosamente'
            });
        }catch(error){
            console.log(error);
        }
    },
    

};
