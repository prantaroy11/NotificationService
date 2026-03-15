// const nodemailer=require('nodemailer');
// const { Resend } = require("resend");

// // const mailer=(userId,password)=>{
// //     return nodemailer.createTransport({
// //         service:'Gmail',
// //         auth:{
// //             user:userId,
// //             pass:password
// //         }
// //     });
// // }

// const resend = new Resend(process.env.RESEND_API_KEY);

// const mailer = (userId, password) => {

//     return nodemailer.createTransport({

//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false,
//         requireTLS:true,

//         auth: {
//             user: userId,
//             pass: password
//         }

//     });

// };

// module.exports=mailer;

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (to, subject, content) => {

  await resend.emails.send({
    from: "prantaroy223@gmail.com",
    to: to,
    subject: subject,
    text: content
  });

};

module.exports = sendMail;