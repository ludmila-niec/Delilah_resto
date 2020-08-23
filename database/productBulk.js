const Product = require("./models/Product");
async function InsertProducts() {
    try {
        await Product.bulkCreate([
            { name: "Bagel de sálmon", price: 425 },
            { name: "Hamburguesa Clasica", price: 350 },
            { name: "Sandwich Veggie", price: 310 },
            { name: "Ensalada Veggie", price: 310 },
            { name: "Focaccia", price: 300 },
            { name: "Sandwich Focaccia", price: 440 },
            { name: "Veggie Avocado", price: 310 },
        ]);
    } catch (error) {
        console.log(error);
    }
}
