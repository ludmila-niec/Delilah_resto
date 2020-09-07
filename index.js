const express = require("express");
const app = express();
const sequelize = require("./database/db");
const dotenv = require("dotenv");
dotenv.config();

require("./database/models/associations");
const {
    validationError,
} = require("./middleware/errorHandler");

//body parser
app.use(express.json());

//routes
const dataRoute = require('./routes/data')
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoutes = require("./routes/order");
const authRoutes = require("./routes/auth");
app.use('/', dataRoute)
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoutes);

//error handlers
app.use(validationError);

const PORT = process.env.PORT || 3000;

//inicia servidor
app.listen(PORT, async () => {
    console.log("Servidor iniciado en el puerto " + PORT);

    //conexion a la base de datos
    try {
        await sequelize.sync();
        console.log("Conectado a la base de datos Delilah");
    } catch (error) {
        console.log(
            "Se ha producido un error intentando conectarse a la base de datos" +
                error
        );
    }
});
