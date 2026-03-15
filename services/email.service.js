const nodemailer=require('nodemailer');
const { Resend } = require("resend");

const mailer=(userId,password)=>{
    return nodemailer.createTransport({
        service:'Gmail',
        secure: true,
        auth:{
            user:userId,
            pass:password
        },
        family: 4
    });
}

const resend = new Resend(process.env.RESEND_API_KEY);



module.exports=mailer;
