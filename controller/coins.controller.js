const { createCustomError } = require('../errors/customAPIError');
const { sendSuccessApiResponse } = require('../middleware/successApiResponse');
const coingeckoService = require('../service.js/coingecko.service');

const currencyExchangeByTime = async (req,res,next)=>{
    try {
        const {fromCurrency,toCurrency,date,currencyType}=req.body;
        // Validating CurrencyId
        const isCoin = await coingeckoService.checkCoin([fromCurrency,toCurrency])
        if(isCoin.length<2)
            return next(createCustomError('Invalid currencyID'))
        const [fromCurrencyPrice, toCurrencyPrice] = await Promise.all([
            coingeckoService.getPriceByDate(fromCurrency, date, currencyType),
            coingeckoService.getPriceByDate(toCurrency, date, currencyType)
        ]);
        const exchangeRate = toCurrencyPrice / fromCurrencyPrice;
        return res.json(sendSuccessApiResponse({ exchangeRate }));
    } catch (err) {
        return next(err);
    }   
}

const companyTreasury = async(req,res,next)=>{
    try{
        const currencyId = req.body.currency;
        // Validating CurrencyId
        const isCoin = await coingeckoService.checkCoin([currencyId]);
        if(!isCoin.length) return next(createCustomError('Invalid currencyID'))
        const companyList = await coingeckoService.treasury(currencyId)
        return res.json(sendSuccessApiResponse(companyList))
    }
    catch(err){
        return next(err)
    }
}

module.exports={currencyExchangeByTime,companyTreasury};