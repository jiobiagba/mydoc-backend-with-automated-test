
const http= require('http'),
        port = process.env.PORT || 4040,
        express = require('express'),
        router = require('./routes/router'),
        routerTimestamp = require('./routes/router-timestamp'),
        mongoose = require('mongoose'),
        url = process.env.MONGO_TEST_URI, //For MongoDB Atlas
        localURL = 'mongodb://localhost/mydoc' //For Local MongoDB

        //Mongoose setup
        mongoose.connect(url,  {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        const db = mongoose.connection;
        db.once('open', () => {
            console.log('Connection to database established!')
        }).catch((err) => {
            console.error('Error in opening database: ', err)
            process.exit(1)
        })

const app = express()

app.use(express.json())
app.use(express.urlencoded( { extended: false }))

app.use('/', router)
app.use('/timestamp', routerTimestamp)

const server = http.createServer(app)
server.listen(port, () => {
    console.info(`Server running on port ${port}`)
})