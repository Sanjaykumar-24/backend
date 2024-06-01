const express = require('express')
const router = express.Router()
// const login = require('./login.js')
const sendOTP = require('../controller/sendOTP');
const signup = require('../services/signup.js')
const playlistRouter = require("./playlist.js")
const search = require('../services/search.js')
router.use("/playlist", playlistRouter)


router.post('/sendotp', sendOTP)
router.post("/signup",signup)
router.get("/search",search)
const login = require('../controller/login');
router.post("/login",login)
const {generateToken} = require('../controller/refresh');
module.exports = router