// const express=require('express');
// const bodyParser = require('body-parser');
// const env=require('dotenv');
// const mongoose=require('mongoose');

// env.config();

// const TicketRoutes=require('./routes/ticket.routes');

// const Cron=require('./crons/cron');

// const app=express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// TicketRoutes(app);

// app.get('/',(req,res)=>{
//     res.send('Home page for notification service');
// });


// app.listen(process.env.PORT,async()=>{
//     console.log(`Notification server started at ${process.env.PORT}`);
//     try{
//         if(process.env.NODE_ENV=='production'){
//             await mongoose.connect(process.env.PROD_DB_URL);
//         }else{
//             await mongoose.connect(process.env.DB_URL);
//         }
//         console.log("Successfully connected to mongo")
//     }catch(err){
//         console.log("No connect made with mongo",err);
//     }
//     Cron.mailerCron();
// });


const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");

env.config();

const TicketRoutes = require("./routes/ticket.routes");
const Cron = require("./crons/cron");

const app = express();

app.use(express.json());

TicketRoutes(app);

app.get("/", (req, res) => {
  res.send("Notification Service Running");
});

const startServer = async () => {
  try {

    if (process.env.NODE_ENV === "production") {
      await mongoose.connect(process.env.PROD_DB_URL);
    } else {
      await mongoose.connect(process.env.DB_URL);
    }

    console.log("Mongo connected");

    Cron.mailerCron();

    app.listen(process.env.PORT, () => {
      console.log(`Notification service running on ${process.env.PORT}`);
    });

  } catch (err) {
    console.log("Mongo connection error", err);
  }
};

startServer();