const router = require("express").Router();
const {createNewUser,login} = require('../service/auth')
const {validateRegisterInput, validateLoginInput} = require('../middleware/user')

//registrar usuario
//publico
router.post('/register',validateRegisterInput,createNewUser)


//iniciar sesion
//publico
router.post('/login', validateLoginInput, login)


module.exports = router;
