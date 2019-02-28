const events = require('events')

const eventsEmitter = new events.EventEmitter()

eventsEmitter.on(`selam ver`, (name, surname) =>{
    console.log(`Merhaba ${name} ${surname}`)
})

eventsEmitter.once(`vedalas`, (name, surname) =>{
    console.log(`Hoşçakal ${name} ${surname}`)
})



const interval = setInterval(() => {
    eventsEmitter.emit(`selam ver`,`okan`, `yücel`)
},1000)

setTimeout(() => {
    eventsEmitter.emit(`vedalas`,`okan`, `yücel`)
    eventsEmitter.emit(`vedalas`,`okan`, `yücel`)
    eventsEmitter.emit(`vedalas`,`okan`, `yücel`)
    clearInterval(interval)
},4000)
