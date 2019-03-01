const express = require('express')
const router = express.Router()

router.get('/user', (req,res,next) => {
    const user = false

    if (user){
        res.send('user response')
    }else{
        return next({status: 404, message: 'Bu kullanıcı bulunamadı.'})
    }
    
})

module.exports = router