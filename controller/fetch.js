const axios = require('axios');
const cryptocurrenciesSchema = require('../models/cryptocurrencies ');
// Function to fetch data from CoinGecko API

async function getData(){
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const fetchData = async (req,res,next)=>{
    try{
        const data = await getData();
        console.log(data);
        for(let i=0;i<data.length;i++){
            const currencies = await cryptocurrenciesSchema.create({
                name: data[i].name,
                currencyId: data[i].id
            })
            currencies.save();
        }
        res.json("inserted successfully")
    }catch(err){
        console.log(err);
    }
}

module.exports = {fetchData};