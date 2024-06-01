const mongoose = require('mongoose')
const watchSchema = new mongoose.Schema({
    public: {
        type: Boolean,
        default: true
    },
    email:{
        type:String,
        required:true
    },
    watchlist: {
        type: [String],
        default: []
    }
})

module.exports = mongoose.model("Playlist", watchSchema)