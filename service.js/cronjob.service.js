const cron = require('node-cron');
const coingeckoService = require('./coingecko.service');
const Currency = require('../models/cryptocurrencies ');


/**
 * @description Cron-Job Task to update the database by new currency 
 */
async function updateCryptocurrencyDataJob() {
    try {
        const cryptocurrencyData = await coingeckoService.getCurrency()
        console.log('Database Updated by Cron-Job');
        const bulkOps = cryptocurrencyData.map(({_id, name }) => ({
            updateOne: {
                filter: { _id },
                update: { $set: { name } },
                upsert: true
            }
        }));
        await Currency.bulkWrite(bulkOps);
    } catch (error) {
        console.error('Error in background job:', error);
    }
}

function startCronJob() {
    cron.schedule('0 * * * *', updateCryptocurrencyDataJob);
    console.log('Cron job started successfully.');
}
module.exports = { startCronJob };