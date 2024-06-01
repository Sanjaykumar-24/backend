const otpGenerator = require('otp-generator')

// function for generating OTP
const generateOTP = () => {
    return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false});
}

module.exports = generateOTP;