// const nodemailer=require('nodemailer');
// const { Resend } = require("resend");

// const mailer=(userId,password)=>{
//     return nodemailer.createTransport({
//         service:'Gmail',
//         secure: true,
//         auth:{
//             user:userId,
//             pass:password
//         },
//         family: 4
//     });
// }

// const resend = new Resend(process.env.RESEND_API_KEY);



// module.exports=mailer;

const { Resend } = require('resend');

const mailer = () => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    return {
        sendMail: async (mailData, callback) => {
            try {
                // THIS WILL PRINT EXACTLY WHAT RENDER IS USING
                console.log("--> RENDER IS USING THIS KEY:", process.env.RESEND_API_KEY);
                
                const data = await resend.emails.send({
                    from: 'onboarding@resend.dev',
                    to: mailData.to, 
                    subject: mailData.subject,
                    text: mailData.text
                });

                if (data.error) {
                    return callback(data.error, null);
                }
                return callback(null, data);
            } catch (err) {
                return callback(err, null);
            }
        }
    };
}

module.exports = mailer;