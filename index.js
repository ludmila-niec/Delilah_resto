const express = require("express");
const app = express();
const sequelize = require('./database/db')
const dotenv = require('dotenv')
dotenv.config()

//body parser
app.use(express.json())

//routes
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const orderRoutes = require('./routes/order')
const registerAndLogRoutes = require('./routes/register_log')
app.use('/', registerAndLogRoutes)
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoutes)

const PORT = process.env.PORT || 3000;



//inicia servidor
app.listen(PORT, async () => {
    console.log("Servidor iniciado en el puerto " + PORT);

    //conexion a la base de datos
    try{
        await sequelize.authenticate()
        console.log('Conectado a la base de datos Delilah');
    }catch(error){
        console.log("Se ha producido un error intentando conectarse a la base de datos" + error);
    }
});
