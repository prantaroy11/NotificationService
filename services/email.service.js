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
    // This automatically grabs the key you just added to Render
    console.log("API KEY EXACT LENGTH:", process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.length : "MISSING");
    console.log("API KEY STARTS WITH:", process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 3) : "MISSING");
    const resend = new Resend(process.env.RESEND_API_KEY);

    return {
        sendMail: async (mailData, callback) => {
            try {
                const data = await resend.emails.send({
                    from: 'onboarding@resend.dev', // Resend's testing email address
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