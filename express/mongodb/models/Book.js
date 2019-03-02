const mongoose =  require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema({
    title: {
        type: String,                                   
        maxlength:[20, ' {PATH} alanı {VALUE}, {MAXLENGTH} karakterden küçük olmalıdır.'],
        //minlenght: [2, 'en az 2 karakter']
        required: true, //olmazsa olmaz zorunlu alan
        unique: true //eğer bu title zaten veri tabanında varsa eklemez
    },
    comments: [{message: String}],
    meta: {
        votes: Number,
        favs: Number
    },
    published: {
        type: Boolean,
        default: false // eğer veri gönderilmezse false olarak alır
    },
    publishedAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('book',BookSchema)

