const jwt = require('jsonwebtoken');
// const redis = require('../dbConnection');

// create jwt access token
const createAccessToken = (id) =>{
    try {
        const token = jwt.sign({id:id}, process.env.JWT_ACCESS_SECRET, {expiresIn: 60*30});  
        // redis.set(id+'userAccess',token,'EX',60*30*60);
        return token;
    } catch (err) {
        throw new Error(err);
    }
} 

// create jwt refresh token
const createRefreshToken = (id) =>{
    try {
        const token = jwt.sign({id:id}, process.env.JWT_REFRESH_SECRET, {expiresIn: '14d'}); 
        // redis.set(id+'userRefresh',token,'EX',1209600); 
        return token;
    } catch (err) {
        throw new Error(err);
    }
}

// verify if jwt access token is correct
const verifyToken = async(token)=>{
    try{
        const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        // const isValid = await redis.get(decode?.id+'userAccess')
        // if(!isValid)
        // {
        //     return { error: "Invalid Token", success: false };
        // }
        return { data: decode, success: true };
    }catch(err){
        return { error: err, success: false };
    }
}

// verify if jwt refresh token is correct
const verifyRefreshToken = (token)=>{
    try{
        const decode = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        // redis.get(decode.id+'userRefresh')
        // .then((redisToken)=>{
        //     if(token != redisToken)
        //     {
        //         return { err: 'Invaid RefreshToken', success: false }
        //     }
        // })
        return { data: decode, success: true };
    }catch(err){
        return { error: err, success: false };
    }
}


module.exports = {createAccessToken, createRefreshToken, verifyToken, verifyRefreshToken}