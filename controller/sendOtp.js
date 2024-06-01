
const sendMail = require('../functions/mailer');
const generateOTP = require('../functions/otpGenerator');
const User = require('../model/user')

// function for sending otp to mail
const sendOTP = async(req,res) =>{
    try {
        const {email} = req.body;
        console.log("hi")
        if(!email){
            return res.status(400).json({message:"email is missing"})
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        const otp = generateOTP();
        sendMail(email, otp);
        return res.status(200).json({message:"Email sent successfully"})
    } catch (err) {
        return res.status(500).json({message:err})
    }
}

module.exports = sendOTP;