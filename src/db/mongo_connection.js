const mongoose = require("mongoose");
const config = require("../config");

mongoose
  .connect(config.mongoDb.connectionStr)
  .then(() => console.log("Conectado a base de datos"))
  .catch((error) =>
    console.log("Ocurrio un error en la conexion a la db", error)
  );
