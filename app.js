const express = require("express");
const app = express();
const config = require("./src/config");
const cors = require("cors");
const multer = require("multer");
const storage = require("./src/config/multer");
require("./src/db/mongo_connection");

const error = require("./src/controllers/error.controllers");
const { auth, products, cart, user } = require("./src/routes");

app.use(cors());
app.use(express.json());
app.use(multer({ storage }).single("image"));

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/products", products);
app.use("/api/cart", cart);
app.use(error.invalidRequest);

app.listen(config.port, () => {
  console.log("Se inicia correctamente el servidor", config.port);
});
