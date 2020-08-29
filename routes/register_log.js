const router = require("express").Router();
const {createNewUser} = require("../service/register")
const {login} = require('../service/login')
const {validateRegisterInput, validateLoginInput} = require('../middleware/user')

//registrar usuario
//publico
router.post('/register',validateRegisterInput,createNewUser)


//iniciar sesion
//publico
router.post('/login', validateLoginInput, login)


module.exports = router;
