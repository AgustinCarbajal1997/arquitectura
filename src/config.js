require("dotenv").config();
module.exports = {
    port:process.env.PORT || 3000,
    mongoDb:{
        connectionStr:process.env.MONGO_STR
    },
    jwt:{
        PRIVATE_KEY:process.env.PRIVATE_KEY_JWT
    }
}