const router = require("express").Router();
const Product = require("../database/models/Product");

//retornar todos los productos
//accesible para usuarios y admin
router.get("/", async (req, res) => {
    let listProducts = await Product.findAll();
    res.json(listProducts);
});

//crear producto
//accesible solo admin
router.post("/", async (req, res) => {
    try{

        let productCreated = await Product.create({
            name: req.body.name,
            price: req.body.price,
        });
        res.json({ message: "Producto creado exitosamente", productCreated });
    }catch(err){
          res.json({ Error: err.errors[0].message });
    }
});

//modificar producto
//accesible solo admin
router.patch("/:idproduct", async (req, res) => {
    const productInsert = req.body;
    const productId = req.params.idproduct;
    try{
        let productModified = await Product.update(
            {
                name: req.body.name,
                price: req.body.price,
            },
            {
                where: {
                    id: productId,
                },
            }
        );
        res.json({ message: "Producto modificado exitosamente", productInsert });
    }catch{
          res.json({ Error: err.errors[0].message });
    }
});

//eliminar producto
//accesible solo admin
router.delete("/:idproduct", async (req, res) => {
    const productId = req.params.idproduct;
    //buscar producto para mostrar el producto eliminado en la respuesta
    let infoProduct = await Product.findByPk(productId);
    let productDeleted = await Product.destroy({
        where: {
            id: productId,
        },
    });
    res.json({ message: "Producto eliminado exitosamente", infoProduct });
});

module.exports = router;
