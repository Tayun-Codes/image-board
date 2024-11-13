const express = require('express')
const app = express()
require('dotenv').config();
// const ejs = require('ejs')
const MongoClient = require('mongodb').MongoClient

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'rappers'

console.log(dbConnectionStr, 'dbConnectionStr')
console.log(process.env.DB_STRING, 'env db_string')

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const PORT = 8000;

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get('/', (request, response) => {
    db.collection('rappers').find().toArray()
        .then(data => {
            console.log(data, 'before filter + sort')
            // matchPinned = {pinned: 'true'}
            // isPinned(data, matchPinned)
            let pinned = data.filter((a)=> a.pinned==='true')
            pinned.sort((a,b) => b.likes - a.likes)
            let notPinned = data.filter((a)=> a.pinned!='true')
            notPinned.sort((a,b) => b.likes - a.likes)
            console.log(pinned, 'PINNED', notPinned, 'NOT PINNED');
            data = pinned.concat(notPinned)
            // console.log(data, 'after filter + sort')
            response.render('index.ejs', { info: data })
        })
        .catch(error => console.error(error))
})

function isPinned(data, match) {
    return collection.filter(obj => Object.keys(source).every(key => obj[key] === source[key]));
  }

app.post('/addRapper', (request, response) => {
    db.collection('rappers').insertOne({stageName: request.body.stageName, birthName: request.body.birthName, likes:0, pinned: 'false'})
        .then(result => {
            // console.log(request.body)
            console.log('Rapper Added')
            response.redirect('/')
        })
        .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('rappers').updateOne({
        stageName: request.body.stageName,
        birthName: request.body.birthName,
        likes: request.body.likes
    }, {
        $set: {
            likes: request.body.likes + 1
        }
    }, {
        sort: { _id: -1 },
        upsert: true
    })
        .then(result => {
            console.log('Added One Like')
            response.json('Like Added')
        })
        .catch(error => console.error(error))
})

app.put('/deleteOneLike', (request, response) => {
    db.collection('rappers').updateOne({
        stageName: request.body.stageName,
        birthName: request.body.birthName,
        likes: request.body.likes
    }, {
        $set: {
            likes: request.body.likes - 1
        }
    }, {
        sort: { _id: -1 },
        upsert: true
    })
        .then(result => {
            console.log('Removed One Like')
            response.json('Like Removed')
        })
        .catch(error => console.error(error))
})

app.put('/pinRapper', (request, response) => {
    db.collection('rappers').updateOne({
        stageName: request.body.stageName,
        birthName: request.body.birthName,
        likes: request.body.likes,
    }, {
        $set: {
            pinned: request.body.pinned
        }
    }, {
        sort: { _id: -1 },
        upsert: true
    })
        .then(result => {
            console.log(request.body)
            console.log('Pinned')
            response.json('Pinned')
            response.redirect('/')
        })
        .catch(error => console.error(error))
})


// app.put('/pinRapper', (request, response) => {
//     // console.log(request.body)
//     db.collection('rappers').updateOne({
//         stageName: request.body.stageName,
//         birthName: request.body.birthName,
//         likes: request.body.likes,
//         pinned: request.body.pinned
//     }, {
//         $set: {
//             pinned: request.body.pinned
//         }
//     }, {
//         sort: { _id: -1 },
//         upsert: true
//     })
//         .then(result => {
//             console.log('Pinned to top')
//             response.json('Pinned to top')
//         })
//         .catch(error => console.error(error))
// })


app.delete('/deleteRapper', (request, response) => {
    db.collection('rappers').deleteOne({
        stageName: request.body.stageName
    })
        .then(result => {
            console.log('Rapper Deleted')
            response.json('Rapper Deleted')
        })
        .catch(error => console.error(error))
})

// function sortByLikes() {
//     db.collection('rappers').sort((a,b) => a.likes - b.likes)
// }