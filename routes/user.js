const router = require("express").Router();
const User = require("../database/models/User");

//accesible solo admin ver todos. Ver uno, user
//retornar un user con id por scope de sesion req.user(user_id)
router.get("/", async (req, res) => {
    let listUsers = await User.findAll();
    res.json(listUsers);
});


module.exports = router;
