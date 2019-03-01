const express = require(`express`)
const app = express()

app.set(`view engine`,`pug`)
app.use(express.static('public'))
app.use(express.static('other-public'))

app.get(`/` ,(req,res) =>{
    res.render(`index.pug`)
})

/*
 get, post, put, delete, all
 ? (zorunlu olmayan) ~ me(hm)?et
 * (yerine herhangi ifade gelebilir)
 + (soldaki ifadenin aynısı olmalı)
*/

app.get('/users/:id/:postId?', (req, res) => {
    res.send(req.params);
});

app.get('/contact', (req, res) => {
    res.send('contact page');
});

app.post('/contact', (req, res) => {
    res.send('contact page post method');
});

/*app.all('/contact', (req, res) => {
    res.send('selam burası app.all() ');
});*/


app.listen(3000, () => {
    console.log("express server is running.")
})