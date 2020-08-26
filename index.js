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

app.get("/", async (req, res) => {
    try {
        let products = await Product.bulkCreate([
            { name: "Bagel de sálmon", price: 425 },
            { name: "Hamburguesa Clasica", price: 350 },
            { name: "Sandwich Veggie", price: 310 },
            { name: "Ensalada Veggie", price: 310 },
            { name: "Focaccia", price: 300 },
            { name: "Sandwich Focaccia", price: 440 },
            { name: "Veggie Avocado", price: 310 },
        ]);
        let status = await OrderStatus.bulkCreate([
            { name: "NUEVO", code: "NEW" },
            { name: "CONFIRMADO", code: "OK" },
            { name: "PREPARANDO", code: "INPREP" },
            { name: "ENVIANDO", code: "SHIP" },
            { name: "ENTREGADO", code: "DELIV" },
            { name: "CANCELADO", code: "CANCEL" },
        ]);
        let paymentMethod = await Payment.bulkCreate([
            { name: "EFECTIVO", code: "EFT" },
            { name: "DEBITO", code: "DBT" },
            { name: "CREDITO", code: "CRDT" },
            { name: "MERCADO PAGO", code: "MP" },
        ]);

        res.json({
            message: "DATA agregados a la base de datos",
            productos: products,
            order_status: status,
            payment_method: paymentMethod,
        });
    } catch (error) {
        console.log(error);
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
