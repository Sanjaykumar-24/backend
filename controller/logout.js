// const redis = require("../dbConnection");

// logout function
const logout =async(req,res)=>{
    try {
        const id = req.user;
        // await redis.del(id+'userAccess');
        // await redis.del(id+'userRefresh');
        res.status(200).json({message:"user logged out successfully"});
    } catch (err) {
        res.status(500).json({message:err});
    }
}

module.exports = logout