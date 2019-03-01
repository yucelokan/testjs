const express = require('express')
const router = express.Router()

const isLogin = require('../helper/isLogin')

router.get('/profile', isLogin , (req,res) => {
    res.send('profile response')
})

module.exports = router