const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

//Models
const Book = require('../models/Book')

/* GET books. */
router.post('/new', function(req, res, next) {

   const book = new Book({
        title: 'Okan',
        published: false,
        comments: [
            {message: 'Harika bir kitap!'},
            {message: 'Ben pek beğenmedim.'}],
        meta: {
            votes: 200,
            favs: 156
        }
    }) 

    book.save((err, data) => {
        if (err)
            console.log(err)
        
        res.json(data)
    })

});

router.get('/search', (req,res,next) => {
    Book.find(
        { 
            published: false, 
            category: {
                $exist: true // eğer category field olanları getir. false ise  category field' ı olmayanları getirir
            }
        },'comments title', (err,data) => { // ikinci parametre sadece o sütunları döndürür comments, title
        res.json(data)
    })
})

router.get('/searchOne', (req,res,next) => {
    Book.findOne({ title: 'Okan'}, (err,data) => { // ilk title = Okan 'ı bulunca arama biter başka var mı diye bakmaz.
        res.json(data)
    })
})

router.get('/searchById', (req,res,next) => {
    Book.findById('5c7a8bbe9f71fc088c826afb', (err,data) => { // {_id : 'asdasd'} şeklindede yapılaibli ama bu daha performanslı
        res.json(data)
    })
})

router.put('/update', (req,res,next) => {
    Book.update(  /// published false olan true yapar // bulduğu ilk kaydı yapar sadece 
        {
            published: false
        }, 
        {
            published: true
        },
        {
            multi: true, // bu parametre sayesinde hepsini true yapar
            //upsert: true // eğer published false olan bulamazsa yeni kayıt ekler
        },
         (err,data) => { 
            res.json(data)
        })
})

router.put('/searchById', (req,res,next) => {
    Book.findByIdAndUpdate( // id bazlı güncelleme
        '5c7a8bbe9f71fc088c826afb',
        {
            title: 'Hello world',
            'meta.favs': 99
        }, 
        (err,data) => { 
        res.json(data)
    })
})

router.get('/getAllBooks', (req,res,next) => {
    Book.find({ }, (err,data) => { // eğer ilk parametre boş gönderilirse tüm kayıtları dön dürür
        res.json(data)
    })
})

router.delete('/delete', (req,res,next) => {
    Book.remove({title : 'Okan'}, (err,data) => {  // kriterlere uygun olan bütün kayıtları siler
        if (err)
            res.json(err)
        else
            res.json(data)
    })

    /*Book.findByIdAndRemove('5c7a8bbe9f71fc088c826afb', (err,data) => {  // önce bulur sonra siler
        if (err)
            res.json(err)
        else
            res.json(data)
    })*/

    /*Book.findById('5c7a8bbe9f71fc088c826afb', (err,data) => {  / aramayı kendin yap sonra sil
        data.remove((removeError, removeData) => {
            res.json(removeData)
        })
    })*/
})

router.get('/sort', (req,res,next) => {
    Book.find({ }, (err,data) => {
        res.json(data)
    }).sort({'meta.favs': 1}) // meta altındaki favs' ı sıralar // 1 küçükten büyüğe // -1 büyükten küçüğe
})

router.get('/limitAndSkip', (req,res,next) => {
    Book.find({ }, (err,data) => {
        res.json(data)
    })
    .skip(2) // ilk 2 kaydı atlar
    .limit(3) // 3 tane kayıt gösterir
})

router.get('/aggregate', (req,res,next) => {
    Book.aggregate([
        {
            $match: {
                published: false
            }
        },
        {
            $project:{
                title: true, // sadece buraya yazılan alanlar döndürülür
                meta: true
            }
        },
        {
            $sort:{
                title: -1
            }
        },
       {
           $limit: 2
       },
        {
            $skip: 4
        } 
        /*{
            $group: {
                _id: '$category', // kategoriye göre gruplar ve her kategoride kaç tane kayıt var onu göndürür
                total: {$sum : 1}
            }
        }*/
    ],(err,result) => {
        res.json(result)
    })
})

router.get('/aggregate-lookup', (req,res,next) => {
    Book.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId('5c7a8bbe9f71fc088c826afb')
                // id objectId olarak tutulduğu için bizimde bunu gözardı etmemiz gerekiyor.
            }
        },
        {
            $lookup: {
                from: 'users', // book ve users collectionlarını join yaptık
                localField: 'userId', // book tablosundaki userId ile eleştirdik
                foreignField: '_id', // user tablosundaki _id ile eleştirdik
                as: 'user' // ve geriye user olarak geri döndürdük.

                // kitapları geri döndürür ve kitaplarının yanında users tablosundan çektiği user bilgilerini de döndürür.
            }
        },
        {
            $unwind: '$user' // yukarıdaki as kısmından buraya aktarılır ve project kısmında kullanabilmek için bu satır yazılır
        },
        {
            $project:{
                user: '$user' ,
                title: true

                /*username: '$user.fullname' , // user tablosundan sadece username i döndürür
                title: true*/
            }
        }
    ],(err,result) => {
        res.json(result)
    })
})

module.exports = router;
