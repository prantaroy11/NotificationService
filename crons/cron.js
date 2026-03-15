// const cron=require('node-cron');
// const Ticket=require('../models/ticketNotification');
// const Mailer=require('../services/email.service');


// // const mailerCron=()=>{
// //     const mailer=Mailer(process.env.EMAIL,process.env.EMAIL_PASS);
// //     cron.schedule('*/2 * * * *',async()=>{
// //         console.log("Executing Cron Again");
// //         const notificationToBeSent=await Ticket.find({status:'PENDING'});

// //         notificationToBeSent.forEach(notification=>{
// //             const mailData={
// //                 from:'prantaroy223@gmail.com',
// //                 to:notification.recepientEmails,
// //                 subject:notification.subject,
// //                 text:notification.content
// //             }

// //             mailer.sendMail(mailData,async(err,data)=>{
// //                 if(err){
// //                     console.log(err);
// //                 }else{
// //                     console.log(data);
// //                     const savedNotification=await Ticket.findOne({_id:notification._id});
// //                     savedNotification.status="SUCCESS";
// //                     await savedNotification.save();
// //                 }
// //             });
// //         });
// //     });
// // }

// const mailerCron=()=>{
//     const mailer=Mailer(process.env.EMAIL,process.env.EMAIL_PASS);
//     cron.schedule('*/2 * * * *', async () => {

//         console.log("Executing Cron Again");

//         const notificationToBeSent = await Ticket.find({ status: "PENDING" });

//         for (const notification of notificationToBeSent) {

//             const mailData = {
//                 from: process.env.EMAIL,
//                 to: notification.recepientEmails,
//                 subject: notification.subject,
//                 text: notification.content
//             };

//             try {

//                 const data = await mailer.sendMail(mailData);

//                 console.log("Mail sent:", data.response);

//                 notification.status = "SUCCESS";
//                 await notification.save();

//             } catch (err) {

//                 console.log("Mail failed:", err.message);

//                 notification.status = "FAILED";
//                 await notification.save();
//             }

//         }

//     });
// }

// module.exports={
//     mailerCron,
// }

const cron = require("node-cron");
const Ticket = require("../models/ticketNotification");
const sendMail = require("../services/email.service");

const mailerCron = () => {

  cron.schedule("*/2 * * * *", async () => {

    console.log("Running notification cron");

    const pendingTickets = await Ticket.find({ status: "PENDING" });

    for (const ticket of pendingTickets) {

      try {

        await sendMail(
          ticket.recepientEmails,
          ticket.subject,
          ticket.content
        );

        ticket.status = "SUCCESS";
        await ticket.save();

        console.log("Email sent");

      } catch (err) {

        console.log("Email failed", err);

        ticket.status = "FAILED";
        await ticket.save();

      }

    }

  });

};

module.exports = {
  mailerCron
};