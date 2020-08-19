const router = require("express").Router();
const User = require("../database/models/User");

//accesible solo admin ver todos. Ver uno, user
//retornar un user con id por scope de sesion req.user.id
router.get("/", async (req, res) => {
    let listUsers = await User.findAll();
    res.json(listUsers);
});

router.post("/", async (req, res) => {
    try {
        let userCreated = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            adress: req.body.adress,
        });

        res.json({ message: "Usuario registrado exitosamente", userCreated });
    } catch (err) {
        res.json({ Error: err.errors[0].message });
        // res.json({ err });
    }
});

module.exports = router;
