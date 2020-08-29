const express = require("express");
const app = express();
const sequelize = require("./database/db");
const dotenv = require("dotenv");
const Product = require("./database/models/Product");
const OrderStatus = require("./database/models/OrderStatus");
const Payment = require("./database/models/Payments");
require("./database/models/associations");
dotenv.config();

//body parser
app.use(express.json());

//routes
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoutes = require("./routes/order");
const registerAndLogRoutes = require("./routes/register_log");
app.use("/", registerAndLogRoutes);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 3000;

//ubicar en file aparte para insertar registros + authAdmin
app.get("/", async (req, res) => {
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

//inicia servidor
app.listen(PORT, async () => {
    console.log("Servidor iniciado en el puerto " + PORT);

    //conexion a la base de datos
    try {
        // await sequelize.authenticate();
        await sequelize.sync();
        console.log("Conectado a la base de datos Delilah");
    } catch (error) {
        console.log(
            "Se ha producido un error intentando conectarse a la base de datos" +
                error
        );
    }
});
