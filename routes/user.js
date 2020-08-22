const router = require("express").Router();
const User = require("../database/models/User");
const { authAdmin, authUser } = require("../middleware/auth");
const { getUserData, getOneUser } = require("../service/user");

//admin puede ver todos los usuarios
//usuario solo puede ver sus datos
router.get("/", authUser, getUserData);

//admin puede buscar usuario en particular
router.get('/:userid', authAdmin, getOneUser)

module.exports = router;
