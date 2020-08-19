const router = require("express").Router();
// const Product = require("../database/models/Product");


//retornar todas las ordenes
//accesible solo admin
router.get("/", async (req, res) => {
   
});

//retornar 1 pedido
//accesible user y admin
router.get("/:idorder", async (req, res) => {
   
});


//crear pedido
//accesible user y admin
router.post('/', async (req, res) =>{})

//modificar pedido
//accesible solo admin
router.put('/:idorder',async (req, res) =>{})

//modificar estado del pedido
//accesible solo admin
router.patch('/:idorder',async (req, res) =>{})



//cancelar pedido
//accesible solo admin
router.delete('/:idorder', (req, res) =>{})
module.exports = router;
