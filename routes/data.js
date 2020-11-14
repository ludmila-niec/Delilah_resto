const router = require("express").Router();
const { authAdmin } = require("../middleware/auth");
const Product = require("../database/models/Product");
const ProductCategory = require("../database/models/ProductCategory");
const OrderStatus = require("../database/models/OrderStatus");
const Payment = require("../database/models/Payments");

router.get("/", authAdmin, async (req, res) => {
    try {
        let categories = await ProductCategory.bulkCreate([
            {
                category_id: 1,
                name: "hamburguesas",
                img: "https://i.ibb.co/FBXK8pt/Burger.png",
            },
            {
                category_id: 2,
                name: "pizzas",
                img: "https://i.ibb.co/qJVNLtX/Pizza.png",
            },
            {
                category_id: 3,
                name: "wraps",
                img: "https://i.ibb.co/SBwW3J8/Burrito.png",
            },
            {
                category_id: 4,
                name: "ensaladas",
                img: "https://i.ibb.co/Z2GmHsx/Salad.png",
            },
            {
                category_id: 5,
                name: "postres",
                img: "https://i.ibb.co/5RPy5nv/Cheesecake.png",
            },
            {
                category_id: 6,
                name: "bebidas",
                img: "https://i.ibb.co/cyhmgKW/Juice.png",
            },
        ]);
        let products = await Product.bulkCreate([
            {
                product_id: 1,
                name: "Hamburguesa clásica",
                description:
                    "Hamburguesa con cheddar, tomate, lechuga, cebolla morada, pepinillos, kétchup y mostaza.",
                img: "https://i.ibb.co/qpFY16s/hamburguesa-clasica.png",
                price: 450,
                category_id: 1,
            },
            {
                product_id: 2,
                name: "Hamburguesa Veggie",
                description:
                    "Hamburguesa 100% vegana de hongos portobello y legumbres, pickles, tomate, lechuga orgánica, súper mayo vegana, en pan de polenta, calabaza.",
                img: "https://i.ibb.co/hykxz3M/hamburguesa-veggie.png",
                price: 490,
                category_id: 1,
            },
            {
                product_id: 3,
                name: "Hamburguesa Blue",
                description:
                    "Hamburguesa de carne 220g, cebollas caramelizadas, tomates asados, queso fundido y cremoso de queso azul.",
                img: "https://i.ibb.co/tKkty55/hamburguesa-brie.png",
                price: 520,
                category_id: 1,
            },
            {
                product_id: 4,
                name: "Hamburguesa Cheddar",
                description:
                    "Hamburguesa triple carne 220g, salsa BBQ, cheddar, lechuga, tomate, panceta.",
                img: "https://i.ibb.co/yksTHt2/hamburguesa-cheddar.png",
                price: 520,
                category_id: 1,
            },
            {
                product_id: 5,
                name: "Pizza Muzzarella con Bacon",
                description:
                    "Pizza de 8 porciones con salsa de tomate, mozzarella y aceitunas.",
                img: "https://i.ibb.co/0QSdwW9/pizza-muzza-bacon.png",
                price: 620,
                category_id: 2,
            },
            {
                product_id: 6,
                name: "Pizza Napolitana",
                description:
                    "Pizza de 8 porciones con salsa de tomate, mozzarella, tomates frescos y ajos confitados.",
                img: "https://i.ibb.co/wK3KCkQ/pizza-napo.png",
                price: 590,
                category_id: 2,
            },
            {
                product_id: 7,
                name: "Pizza Ahumada",
                description:
                    "Pizza de 8 porciones con salsa de tomate, mozzarella, vegetales ahumados al quebracho y mix de hongos.",
                img: "https://i.ibb.co/ZmLH2M6/pizza.png",
                price: 620,
                category_id: 2,
            },
            {
                product_id: 8,
                name: "Wrap Caesar",
                description:
                    "Wrap con mix de verdes, suprema de pollo crispy, crutones de pan de campo, lluvia de parmesano y tradicional aderezo caesar.",
                img: "https://i.ibb.co/jgCFkWk/wrap-caesar-2.png",
                price: 575,
                category_id: 3,
            },
            {
                product_id: 9,
                name: "Wrap Sweet Beef",
                description:
                    "Wrap de ternera ahumada, braseada y desmechada, cebolla caramelizada, muzzarella, tomates asados, aderezo de pimientos.",
                img: "https://i.ibb.co/M2gRzKm/wrap-beef.png",
                price: 575,
                category_id: 3,
            },
            {
                product_id: 10,
                name: "Wrap Veggie",
                description:
                    "Wrap de vegetales al quebracho, queso fundido, rúcula fresca, hummus de berenjena ahumada.",
                img: "https://i.ibb.co/PrNZY2m/wrap-veggie-2.png",
                price: 575,
                category_id: 3,
            },
            {
                product_id: 11,
                name: "Ensala Panko Chicken",
                description:
                    "Ensalada con mezclum de verdes, supremas de pollo rebozadas en panko, tomates asados, vegetales al horno de barro, cebolla crocante y vinagreta cítrica.",
                img: "https://i.ibb.co/C9LkY2y/ensalada-panko.png",
                price: 490,
                category_id: 4,
            },
            {
                product_id: 12,
                name: "Ensalada Caesar",
                description:
                    "Ensalada con mix de verdes, suprema de pollo grillada, crutones de pan de campo, lluvia de parmesano y tradicional aderezo caesar.",
                img: "https://i.ibb.co/FbD3cMp/ensalada-caesar.png",
                price: 450,
                category_id: 4,
            },
            {
                product_id: 13,
                name: "Ensalada Clásica",
                description:
                    "Ensalada con mix de verdes con rúcula, palta, vegetales grillados, olivas, tomate, choclo, alcaparras, pollo grillado y huevo poché.",
                img: "https://i.ibb.co/6WGKsJj/ensalada-clasica.png",
                price: 400,
                category_id: 4,
            },
            {
                product_id: 14,
                name: "Key Lime Pie",
                description:
                    "Porción de Key Lime Pie. Base crocante de galletitas dulces con relleno curd de lima.",
                img: "https://i.ibb.co/fHwP5FD/postre-key-lime-pie.png",
                price: 300,
                category_id: 5,
            },
            {
                product_id: 15,
                name: "Cheesecake con frutos rojos",
                description:
                    "Porción de cheesecake de mousse de queso, galletas dulces molidas, mermelada de frutos rojos.",
                img: "https://i.ibb.co/tQpRDMj/postre-cheesecake.png",
                price: 300,
                category_id: 5,
            },
            {
                product_id: 16,
                name: "Carrot Cake",
                description:
                    "Porción de carrot cake. Bizcochuelo con zanahoria, naranja, nueces y canela. Topping de buttercream con praliné.",
                img: "https://i.ibb.co/HF1DLH7/postre-carrot-cake.png",
                price: 350,
                category_id: 5,
            },
            {
                product_id: 17,
                name: "Tiramisú",
                description:
                    "Ensalada con mix de verdes con rúcula, palta, vegetales grillados, olivas, tomate, choclo, alcaparras, pollo grillado y huevo poché.",
                img: "https://i.ibb.co/s6XbXML/postres-tiramissu.png",
                price: 350,
                category_id: 5,
            },
            {
                product_id: 18,
                name: "Agua saborizada Limon",
                description:
                    "Agua de fruta natural. Mix de limón, menta y cedrón.",
                img: "https://i.ibb.co/V2V4Grn/bebida-limonada.png",
                price: 159,
                category_id: 6,
            },
            {
                product_id: 19,
                name: "Agua saborizada Durazno",
                description:
                    "Agua de fruta natural. Mix de durazno, naranja y tilo",
                img: "https://i.ibb.co/SVKF1xW/agua-peach.png",
                price: 159,
                category_id: 6,
            },
            {
                product_id: 20,
                name: "Agua saborizada Frutos rojos",
                description:
                    "Agua de fruta natural. Mix de frutilla, pomelo y frambuesa",
                img: "https://i.ibb.co/JQxR5Wg/bebida-berry.png",
                price: 159,
                category_id: 6,
            },
            {
                product_id: 21,
                name: "Agua sin gas",
                description: "Agua en botella de 500ml",
                img: "https://i.ibb.co/grxpd9Q/bebida-agua.png",
                price: 120,
                category_id: 6,
            },
            {
                product_id: 22,
                name: "Gaseosa Coca Cola",
                description: "Coca Cola en botella de 500ml",
                img: "https://i.ibb.co/yfq2khq/bebida-coca-cola.png",
                price: 130,
                category_id: 6,
            },
            {
                product_id: 23,
                name: "Gaseosa Sprite Lima Limon",
                description: "Sprite en botella de 500ml",
                img: "https://i.ibb.co/RDp7xVP/bebida-sprite.png",
                price: 130,
                category_id: 6,
            },
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
            categorias: categories,
            order_status: status,
            payment_method: paymentMethod,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ Error: "Los datos ya fueron cargados" });
    }
});

module.exports = router;
