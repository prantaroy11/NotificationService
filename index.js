const express=require('express');
const bodyParser = require('body-parser');
const env=require('dotenv');
const mongoose=require('mongoose');

env.config();

const TicketRoutes=require('./routes/ticket.routes');

const Cron=require('./crons/cron');

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

TicketRoutes(app);

app.get('/',(req,res)=>{
    res.send('Home page for notification service');
});


app.listen(process.env.PORT,async()=>{
    console.log(`Notification server started at ${process.env.PORT}`);
    try{
        if(process.env.NODE_ENV=='production'){
            await mongoose.connect(process.env.PROD_DB_URL);
        }else{
            await mongoose.connect(process.env.DB_URL);
        }
        console.log("Successfully connected to mongo")
    }catch(err){
        console.log("No connect made with mongo",err);
    }
    Cron.mailerCron();
});