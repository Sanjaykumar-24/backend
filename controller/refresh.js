const { verifyRefreshToken, createAccessToken } = require("../functions/jwt");

// generate new jwt access token using refresh token
const generateToken = (req, res) =>{
    try{
        const token = req.headers['authorization'].split(' ')[1];
        if(!token){
            return res.status(500).json({message:"token not found"})
        }
        const verify = verifyRefreshToken(token);
        if(!verify.success){
            return res.status(500).json({message: verify.error})
        }
        const newAccessToken = createAccessToken(verify.data.id);
        if(!newAccessToken){
            return res.status(500).json({message: "access token not created"})
        }
        res.json({token: newAccessToken});
    }catch(err){
        return res.status(500).json({message:err})
    }
}


module.exports = { generateToken }