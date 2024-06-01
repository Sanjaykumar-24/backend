// const UserModel = require('../model/user.js')
// const bcrypt = require('bcrypt')
// const login = async(req,res)=>{
//    try{
//     const {username,password} = req.body
//     if(!username || !password)
//         {
//             return res.json({message:"Failed", error:"Data insufficient!"});
//         }
//     const user = await UserModel.findOne({ username:username })
//     if(!user)
//     {
//       return res.json({message:"Failed",error:"User not found!"})
//     }
//     bcrypt.compare(password,user.password,async(error,result)=>{
//       if(result)
//         {
//           res.cookie("fasal",username,{httpOnly:true,maxAge:10*60*1000})
//           return res.json({message:"Success",info:"password correct!"})
//         }
//         else
//         {
//           return res.json({message:"Failed",error:"error with password"})
//         }
//     })
//    }
//    catch(error)
//    {
//      return res.json({message:"Failed",error:"Inteernal server error!"})
//    }
// }
// module.exports = login

const { createAccessToken, createRefreshToken } = require('../functions/jwt');
const User = require('../model/user')
const bcrypt = require('bcryptjs')
const Playlist = require("../model/watchlist")

// login function
const login = async(req,res) =>{
    try{
        const {email, password} = req.body;
        if(!(email||password)){
            console.log('All feilds are mandatory');
            return res.status(400).json({message:"All feilds are mandatory."})
        }
        
        const user = await User.findOne({email:email})
        if(!user){
          console.log({message:"User does not exists."})
            return res.status(400).json({message:"User does not exists."})
        }
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if(!isPasswordCorrect){
          console.log({message:"Invalid credentials."})
            return res.status(400).json({message:"Invalid credentials."})
        }
        console.log(1)
        const accessToken = createAccessToken(user._id)
        const refreshToken = createRefreshToken(user._id)
        res.status(200).json({message:"User logged in.", accessToken, refreshToken, data: user})

    }catch(err){
        console.log(err);
        return res.status(500).json({message:err})
    }
}

module.exports = login;