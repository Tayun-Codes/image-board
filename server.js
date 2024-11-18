const express = require('express')
const app = express()
require('dotenv').config();
// const ejs = require('ejs')
const MongoClient = require('mongodb').MongoClient
const multer = require('multer')
// const ImageModel = require('./image.model')
const upload = multer({ /*dest: './public/data/uploads/'*/ })

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'imageBoard'

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
    db.collection('images').find().toArray()
        .then(data => {
            response.render('index.ejs', { info: data })
        })
        .catch(error => console.error(error))
})

app.post('/addImage', upload.single('uploaded_file'), (req, response) => {
    console.log(req.file, 'file', req.body, 'body')
    db.collection('images').insertOne({ src: req.file.buffer, title: req.body.title, description: req.body.description, likes: 0 })
        .then(result => {
            console.log('Image Added')
            response.redirect('/')
        })
        .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('images').updateOne({
        title: request.body.title,
        id: request.body.id,
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

app.delete('/deleteImage', (request, response) => {
    db.collection('images').deleteOne({
        title: request.body.title,
        id: request.body.id,
    })
        .then(result => {
            console.log('Image Deleted')
            response.json('Image Deleted')
        })
        .catch(error => console.error(error))
})