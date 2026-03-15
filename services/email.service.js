const nodemailer=require('nodemailer');

// const mailer=(userId,password)=>{
//     return nodemailer.createTransport({
//         service:'Gmail',
//         auth:{
//             user:userId,
//             pass:password
//         }
//     });
// }

const mailer = (userId, password) => {

    return nodemailer.createTransport({

        host: "smtp.gmail.com",
        port: 587,
        secure: false,

        auth: {
            user: userId,
            pass: password
        }

    });

};

module.exports=mailer;