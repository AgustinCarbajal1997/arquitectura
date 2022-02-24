const express = require("express");
const app = express();
const config = require("./src/config");
const cors = require("cors");
require("./src/db/mongo_connection");


const error = require("./src/controllers/error.controllers");
const products = require("./src/routes/products");
const cart = require("./src/routes/cart");
const auth = require("./src/routes/auth");
const user = require("./src/routes/user");

app.use(cors());
app.use(express.json());


app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/products", products);
app.use("/api/cart",cart);
app.use(error.invalidRequest);



app.listen(config.port, () => {
    console.log("Se inicia correctamente el servidor", config.port)
})