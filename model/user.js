// const mongoose  = require('mongoose')
// const UserSchema = new mongoose.Schema(
//     {
//         username:{
//             type:String,
//             unique:true,
//             required:true
//         },
//         password:{
//             type:String,
//             required:true
//         }
//     }
// )
// const UserModel = mongoose.model('users',UserSchema)
// module.exports = UserModel 

const mongoose = require('mongoose');

// database schema for users
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
})

module.exports = mongoose.model('User', userSchema);