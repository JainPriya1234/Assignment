const cron = require('node-cron');
const coingeckoService = require('./coingecko.service');
const Currency = require('../models/cryptocurrencies ');

async function updateCryptocurrencyDataJob() {
    try {
        const cryptocurrencyData = await coingeckoService.getCurrency()
        const bulkOps = cryptocurrencyData.map(({ id, name }) => ({
            updateOne: {
                filter: { id },
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