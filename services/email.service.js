const nodemailer=require('nodemailer');

const sendMain=(userId,password)=>{
    const transport=nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:userId,
            pass:password
        }
    });
    transport.sendMail({
            from:'mba@support.com',
            to:'prantaroy223@gmail.com',
            subject:'Test email for nodemailer',
            text:'Hey, this another test email'
        });
}

module.exports=sendMain;