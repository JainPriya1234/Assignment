const mongoose = require("mongoose")
const cryptocurrencies  = new mongoose.Schema({
    name:{
        type: String
    },
    currencyId: {
        type: String
    }
});

module.exports =  mongoose.model("cryptocurrencies", cryptocurrencies, "cryptocurrencies");