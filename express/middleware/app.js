const express = require('express')
const app = express()

const user = require('./routes/user')
const profile = require('./routes/profile')
//const isLogin = require('./helper/isLogin')

//app.use('/profile',isLogin)
app.set('view engine','pug')
app.use('/',user)
app.use('/',profile)


app.use((err,req,res,next) => {
    res.status(err.status)
    res.render('error', {
        message: err.message,
        status: err.status
    })
})


app.listen(3000, (req,res) => {
    console.log('server is running')
})