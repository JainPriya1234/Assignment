const express = require('express');
const router = express.Router();
const {currencyExchangeByTime, companyTreasury}=require('../controller/coins.controller');
//const {fetchData} = require('../controller/fetch');

router.get("/", (req, res) => {
    res.send("API  is running!!!");
});
 
//router.get("/getall",fetchData);

router.post("/getprice",currencyExchangeByTime);
router.post('/public_treasury',companyTreasury)

module.exports = router;