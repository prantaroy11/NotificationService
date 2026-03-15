const cron=require('node-cron');
const Ticket=require('../models/ticketNotification');
const Mailer=require('../services/email.service');


const mailerCron=()=>{
    const mailer=Mailer(process.env.EMAIL,process.env.EMAIL_PASS);
    cron.schedule('* * * * *',async()=>{
        console.log("Executing Cron Again");
        const notificationToBeSent=await Ticket.find({status:'PENDING'});

        notificationToBeSent.forEach(notification=>{
            const mailData={
                from:process.env.EMAIL,
                to:notification.recepientEmails,
                subject:notification.subject,
                text:notification.content
            }

            mailer.sendMail(mailData,async(err,data)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(data);
                    const savedNotification=await Ticket.findOne({_id:notification._id});
                    savedNotification.status="SUCCESS";
                    await savedNotification.save();
                }
            });
        });
    });
}


module.exports={
    mailerCron,
}

