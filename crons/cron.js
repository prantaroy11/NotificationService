const cron=require('node-cron');
const Ticket=require('../models/ticketNotification');
const sendMail=require('../services/email.service');

cron.schedule('*/2 * * * *',async()=>{
    const notificationToBeSent=await Ticket.find({status:'PENDING'});

    notificationToBeSent.forEach(notification=>{
        const mailData={
            from:'prantaroy223@gmail.com',
            to:notification.recepientEmails,
            subject:notification.subject,
            text:notification.content
        }

        sendMail(process.env.EMAIL,process.env.EMAIL_PASS,mailData);
    });
});