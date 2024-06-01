const express = require("express")
const router = express.Router()
const controllers = require("../controller/playlist")
router.post("/all", controllers.getAll)
router.post("/add", controllers.addToPlayList)
router.post("/delete", controllers.removeFromPlaylist)

module.exports = router;