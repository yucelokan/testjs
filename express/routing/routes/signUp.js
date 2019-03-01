const express = require('express')
const router = express.Router()

router.get('/signUp' , (req,res) => {
    res.send('signUp get')
})

router.post('/signUp' , (req,res) => {
    res.send('signUp post')
})

module.exports = router
