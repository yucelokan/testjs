//console.log(__filename)
//console.log(__dirname)

const fs = require(`fs`)

fs.readFile(`demo.txt`, (error,data) => {
    if (error == null){
        console.log(data.toString())
        console.log(`dosya okuma bitti`)
    }else{
        console.log(error)
    }
})

/*var icerik = fs.readFileSync(`demo.txt`)
console.log(icerik.toString())
console.log(`dosya okuma bitti 1`)


fs.appendFileSync(`demo.txt`, ` eklenen text`)
console.log(`dosya ekleme bitti`)
icerik = fs.readFileSync(`demo.txt`)
console.log(icerik.toString())
console.log(`dosya okuma bitti 2`)


fs.writeFileSync(`demo.txt`,` yeni text`)
console.log(`dosya yazma bitti`)
icerik = fs.readFileSync(`demo.txt`)
console.log(icerik.toString())
console.log(`dosya okuma bitti 3`)


fs.unlink(`demo.txt`,(err) =>{
    if (err != null){
        console.log(err)
    }else{
        console.log(`unlinked`)
    }
        
})*/