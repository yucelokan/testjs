const express = require('express')
const router = express.Router()

router.get('/signIn' , (req,res) => {
    res.send('signIn get')
})

router.post('/signIn' , (req,res) => {
    res.send('signIn post')
})

module.exports = router
