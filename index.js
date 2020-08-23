const express = require("express");
const app = express();
const sequelize = require("./database/db");
const dotenv = require("dotenv");
const Product = require("./database/models/Product");
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

        res.json({
            message: "Productos agregados a la base de datos",
            data: products,
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
        await sequelize.authenticate();
        console.log("Conectado a la base de datos Delilah");
    } catch (error) {
        console.log(
            "Se ha producido un error intentando conectarse a la base de datos" +
                error
        );
    }
});
