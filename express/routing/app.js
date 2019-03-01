const express = require(`express`)
const app = express()

const signIn  = require('./routes/signIn')
const signUp  = require('./routes/signUp')

app.use('/user',signUp)
app.use('/',signIn)


app.listen(3000, () => {
    console.log("express server is running.")
})