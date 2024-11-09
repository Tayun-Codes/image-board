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
            console.log(data[0].likes)
            data.sort((a,b) => b.likes - a.likes)
            response.render('index.ejs', { info: data })
        })
        .catch(error => console.error(error))
})

app.post('/addRapper', (request, response) => {
    db.collection('rappers').insertOne({stageName: request.body.stageName, birthName: request.body.birthName, likes:0})
        .then(result => {
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