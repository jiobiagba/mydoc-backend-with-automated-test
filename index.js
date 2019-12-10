
const http= require('http'),
        port = process.env.PORT || 4040,
        path = require('path'),
        express = require('express'),
        compression = require('compression'),
        helmet = require('helmet'),
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


        //DataBase Connection
        const db = mongoose.connection;
        db.once('open', () => {
            console.log('Connection to database established!')
        }).catch((err) => {
            console.error('Error in opening database: ', err)
            process.exit(1)
        })

const app = express()

app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded( { extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(compression())
app.use(helmet())

app.use('/', router)
app.use('/timestamp', routerTimestamp)

const server = http.createServer(app)
server.listen(port, () => {
    console.info(`Server running on port ${port}`)
})