const router = require("express").Router();
const { authAdmin } = require("../middleware/auth");
const Product = require("../database/models/Product");
const OrderStatus = require("../database/models/OrderStatus");
const Payment = require("../database/models/Payments");

router.get("/", authAdmin, async (req, res) => {
    try {
        let products = await Product.bulkCreate([
            { product_id: 1, name: "Bagel de sálmon", price: 425 },
            { product_id: 2, name: "Hamburguesa Clasica", price: 350 },
            { product_id: 3, name: "Sandwich Veggie", price: 310 },
            { product_id: 4, name: "Ensalada Veggie", price: 310 },
            { product_id: 5, name: "Focaccia", price: 300 },
            { product_id: 6, name: "Sandwich Focaccia", price: 440 },
            { product_id: 7, name: "Veggie Avocado", price: 310 },
        ]);
        let status = await OrderStatus.bulkCreate([
            { id: 1, name: "NUEVO", code: "NEW" },
            { id: 2, name: "CONFIRMADO", code: "OK" },
            { id: 3, name: "PREPARANDO", code: "INPREP" },
            { id: 4, name: "ENVIANDO", code: "SHIP" },
            { id: 5, name: "ENTREGADO", code: "DELIV" },
            { id: 6, name: "CANCELADO", code: "CANCEL" },
        ]);
        let paymentMethod = await Payment.bulkCreate([
            { payment_id: 1, name: "EFECTIVO", code: "EFT" },
            { payment_id: 2, name: "DEBITO", code: "DBT" },
            { payment_id: 3, name: "CREDITO", code: "CRDT" },
            { payment_id: 4, name: "MERCADO PAGO", code: "MP" },
        ]);

        res.json({
            message: "DATA agregados a la base de datos",
            productos: products,
            order_status: status,
            payment_method: paymentMethod,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ Error: "Los datos ya fueron cargados" });
    }
});

module.exports = router