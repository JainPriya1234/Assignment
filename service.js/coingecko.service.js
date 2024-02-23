const { createCustomError } = require("../errors/customAPIError")
const Currency = require('../models/cryptocurrencies ')
// To get Current Date
const currentDate= ()=>{
    return new Date(Date.now()).toLocaleString().split(',')[0].replace(/\//g, '-')
}

/**
 * @description Validates the coin name from Database
 * @param {String} currencyId 
 */
const checkCoin = async (query) =>{
    return await Currency.find({currencyId:{
        $in:query
    }});
}

/**
 * @description Get 
 * @param {String} currencyId 
 * @param {Date} date 
 * @param {String} currencyType 
 * @returns {Number}
 */
const getPriceByDate = async (currencyId,date = currentDate(),currencyType='usd')=>{
    try{
        const data = await fetch(`https://api.coingecko.com/api/v3/coins/${currencyId}/history?date=${date}`).then((res)=>{
            if(res.ok) return res.json();
            throw new Error('Something Went Wrong');
        })
        .catch(err=> {throw err})
        const currentPrice = data?.market_data?.current_price?.[currencyType];
        return currentPrice;
    }
    catch(err){
        throw new Error(err)
    }
}

const treasury = async(currencyId) =>{
    try{
        const data = await fetch(`https://api.coingecko.com/api/v3/companies/public_treasury/${currencyId}`).then((res)=>{
            if(res.ok) return res.json();
            throw new Error('Something Went Wrong');
        })
        .catch(err=> {throw err})
        return data?.companies;
    }
    catch(err){
        throw new Error(err)
    }
}

/**
 * @description get all currency
 * @returns Promise<any>
 */
const getCurrency = async()=>{
    try{
        const data = await fetch('https://api.coingecko.com/api/v3/coins/list').then((res)=>{
            if(res.ok) return res.json();
            throw new Error('Something Went Wrong');
        })
        .catch(err=>{throw err})
        return data
    }
    catch(err){
        throw new Error(err);
    }
}
module.exports={getPriceByDate,checkCoin,treasury,getCurrency};