const nodemailer = require('nodemailer')
const fs = require('fs')

// mail html template
const htmlTemplate = fs.readFileSync(
    "./template/otp_mail.html",
    "utf8"
);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

// function for sending a mail
const sendMail = (email,otp)=>{
    try{
        let mailOptions = {
            from: 'teamlearnlegacy@gmail.com',
            to: email,
            subject: "OTP mail verification",
            html: htmlTemplate.replace("${otp}", otp)
        };
    
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred:', error.message);
            } else {
                console.log('Email sent successfully:', info.response);
            }
        });
    }
    catch(err){
        console.log(err);
    }
}

module.exports = sendMail;