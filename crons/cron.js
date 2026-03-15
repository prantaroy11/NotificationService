const cron=require('node-cron');
const Ticket=require('../models/ticketNotification');
const Mailer=require('../services/email.service');


// const mailerCron=()=>{
//     const mailer=Mailer(process.env.EMAIL,process.env.EMAIL_PASS);
//     cron.schedule('*/2 * * * *',async()=>{
//         console.log("Executing Cron Again");
//         const notificationToBeSent=await Ticket.find({status:'PENDING'});

//         notificationToBeSent.forEach(notification=>{
//             const mailData={
//                 from:'prantaroy223@gmail.com',
//                 to:notification.recepientEmails,
//                 subject:notification.subject,
//                 text:notification.content
//             }

//             mailer.sendMail(mailData,async(err,data)=>{
//                 if(err){
//                     console.log(err);
//                 }else{
//                     console.log(data);
//                     const savedNotification=await Ticket.findOne({_id:notification._id});
//                     savedNotification.status="SUCCESS";
//                     await savedNotification.save();
//                 }
//             });
//         });
//     });
// }

const mailerCron=()=>{
    const mailer=Mailer(process.env.EMAIL,process.env.EMAIL_PASS);
    cron.schedule('*/2 * * * *', async () => {

        console.log("Executing Cron Again");

        const notificationToBeSent = await Ticket.find({ status: "PENDING" });

        for (const notification of notificationToBeSent) {

            const mailData = {
                from: process.env.EMAIL,
                to: notification.recepientEmails,
                subject: notification.subject,
                text: notification.content
            };

            try {

                const data = await mailer.sendMail(mailData);

                console.log("Mail sent:", data.response);

                notification.status = "SUCCESS";
                await notification.save();

            } catch (err) {

                console.log("Mail failed:", err.message);

                notification.status = "FAILED";
                await notification.save();
            }

        }

    });
}

module.exports={
    mailerCron,
}