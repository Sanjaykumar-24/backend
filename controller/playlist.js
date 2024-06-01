const Playlist = require("../model/watchlist")

const addToPlayList = async (req, res) => {
    try {
        const { email, id } = req.body
        console.log(1)
        const added = await Playlist.findOne({ email })
        added.watchlist.push(id)
        await added.save()
        res.status(201).json({ message: "success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}

const removeFromPlaylist = async (req, res) => {
    try {
        const { email, id } = req.body
        const added = await Playlist.findOne({ email })
        added.watchlist = added.watchlist.filter(entry => entry !== id)
        await added.save()
        res.status(201).json({ message: success }) 
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const getAll = async (req, res) => {
    try {
        const { email } = req.body

        const data = await Playlist.findOne({ email })
        res.json({ data: data.watchlist })
    } catch (error) {
        res.status(500).json({ message: error })
        
    }
}

module.exports = { addToPlayList, removeFromPlaylist, getAll }