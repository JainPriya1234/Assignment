const dotenv = require('dotenv');
const express = require("express");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");
const router = require("./routes/routes");
const mongoose=require("mongoose")
const nodeCronService = require('./service.js/cronjob.service');


// Load environment variables
dotenv.config();

// Create Express server
const app = express();

//connecting database
mongoose.connect(process.env.MONGO_URI)
.then(( )=> {
    console.log("DB Connected Succesfully....")
    app.listen(process.env.PORT || 3000,()=>{
        console.log("App is running at http://localhost:%d ",process.env.PORT);
    })
})
.catch((err)=>{
    console.log(err,"DB Connection Failed!")
    process.exit(1)
});


// Express configuration
app.use(express.json());

// Start the cron job
nodeCronService.startCronJob();

app.use(router);


// // Error handling
app.use(errorHandler)
app.use(notFound);


module.exports = app;
