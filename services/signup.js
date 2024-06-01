// const UserModel = require('../model/user.js')
// const bcrypt = require('bcrypt')
// const signup = async(req,res)=>{
//    const {username,password} = req.body
//    try{
//     if(!username || !password)
//         {
//             return res.json({message:"Failed", error:"Data insufficient!"});
//         }
//     const user = await UserModel.findOne({username:username})
//     if(user)
//         {
//             return res.json({message:"Failed",error:"User already exists!"})
//         }
//     const hashpass = await bcrypt.hash(password,10)
//     const data = await UserModel.create({username,password:hashpass})
//     data.save()
//     res.cookie("fasal",username,{httpOnly:true,maxAge:10*60*1000})
//     return res.json({message:"Success",info:"cookie stored"});
//    }
//    catch(error)
//    {
//     return res.json({message:"Failed",error:"Internal server error!"})
//    }
// }
// module.exports = signup



const User = require('../model/user')
const Playlist = require('../model/watchlist')
const bcrypt = require('bcryptjs')
const {createAccessToken, createRefreshToken} = require('../functions/jwt')
// const redis = require('../dbConnection')

// signup function
const signup = async(req,res) =>{
    try{
        const {name, email, code: otp, password} = req.body;
        console.log(req .body)
        if(!name|| !email|| !password|| !otp){
            console.log('All feilds are mandatory');
            return res.status(400).json({message:"All feilds are mandatory."})
        }

        const isExisting = await User.findOne({email:email})
        if(isExisting){
            return res.status(400).json({message:"User already exists."})
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const user = await User.create({name:name, email:email, password:hashPassword});

        console.log("hi")
        
        if(user){
            const accessToken = createAccessToken(user._id)
            const refreshToken = createRefreshToken(user._id)
            await Playlist.create({ email })
            return res.status(200).json({message:"User created successfully.", accessToken, refreshToken})
        }
        else{
            return res.status(400).json({message:"Not able to create user."})
        }

    }catch(err){
        return res.status(500).json({message:err})
    }
}

module.exports = signup;