const slugify = require('slugify')
 
const text = `Fenerbahçe Spor Klübü`
const value = slugify(text) // some-string

console.log(value)