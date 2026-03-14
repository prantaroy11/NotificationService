const express=require('express');
const bodyParser = require('body-parser');
const env=require('dotenv');
const mongoose=require('mongoose');

env.config();

const sendMain=require('./services/email.service');

const TicketRoutes=require('./routes/ticket.routes');

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

TicketRoutes(app);


app.listen(process.env.PORT,async()=>{
    console.log(`Notification server started at ${process.env.PORT}`);
    sendMain(process.env.EMAIL,process.env.EMAIL_PASS)
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Successfully connected to mongo")
    }catch(err){
        console.log(err);
    }
});