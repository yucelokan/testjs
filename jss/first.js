"use strict"

const user = {
    id : 1,
    name : "Okan"
}

const location = {
    x : 19,
    y : 12
}

const friends = [
    {
        id : 2,
        name : "Uğur"
    },
    {
        id : 3,
        name : "Mami"
    }
]

const getUser = () =>{
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(user)
        },6000)
    })
}

const getFriends = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId == 1){
                reject("error message from getFriends : userId can not be 1")
            }else{
                resolve(location)
            }
        },4000)
    })
}

const getUserLocation = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId == 1){
                reject("error message from getUserLocation : userId can not be 1")
            }else{
                resolve(location)
            }
            
        },3000)
    })
}


/*getUser()
    .then((user) => {
        return getFriends(user.id)
    })
    .then((friends) => {
        console.log(user.name)
        console.log(...friends)
    })*/



async function asenkron(){

    try{
        console.log(`user yükleniyor`)
        const user = await getUser()
        console.log(user.name)
        console.log(`user location yükleniyor`)
    
        const location = getUserLocation(user.id)
                            .then(() =>{
                                console.log(`user location yüklendi`)
                             })
                             .catch((error) =>{
                                 console.log(error)
                             })
    
        console.log(`friends yükleniyor`)
        const friends = await getFriends(user.id)
        console.log(...friends)
    }catch(error){
        console.log(error)
    }
    
}

asenkron()