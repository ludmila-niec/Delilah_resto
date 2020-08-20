const router = require("express").Router();
const {validateRegisterInput} = require('../middleware/register')
const { validateEmptyInput } = require("../middleware/login");
const {createNewUser} = require("../service/register")
const {login} = require('../service/login')

//registrar usuario
//publico
router.post('/register',validateRegisterInput,createNewUser)


//iniciar sesion
//publico
router.post('/login', validateEmptyInput, login)


module.exports = router;
