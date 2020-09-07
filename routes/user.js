const router = require("express").Router();
const { authAdmin, authUser } = require("../middleware/auth");
const { validateUpdateInput } = require("../middleware/user");
const { getUserData, getOneUser, updateUser, deleteUser} = require("../service/user");

//admin puede ver todos los usuarios
//usuario solo puede ver sus datos
router.get("/", authUser, getUserData);

//admin puede buscar usuario en particular
router.get("/:userId", authAdmin, getOneUser);

//modificar datos del usuarios
router.patch("/", authUser, validateUpdateInput, updateUser);

//eliminar usuario
//solo admin
router.delete('/:userId', authAdmin, deleteUser)
module.exports = router;
