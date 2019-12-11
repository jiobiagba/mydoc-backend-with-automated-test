
const http= require('http'),
        port = process.env.PORT || 4040,
        path = require('path'),
        express = require('express'),
        compression = require('compression'),
        debug = require('debug')('starter'),
        helmet = require('helmet'),
        router = require('./routes/router'),
        routerTimestamp = require('./routes/router-timestamp'),
        mongoose = require('mongoose'),
        localURL = 'mongodb://localhost/mydoc' //For Local MongoDB


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

const starter = async () => {
            const url = process.env.MONGO_TEST_URI

            mongoose.connect(localURL,  {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }) 
            
            const db = mongoose.connection

            db.on('error', console.error.bind(debug, 'Error in database connection: '))
            db.once('open', () =>{
                debug('Connection to database established!')
                server.listen(port, () => {
                debug(`Server running on port ${port}`)
                })
            }) 
        }

const power = () => {
    server.listen(port, () => {
    debug(`Server running on port ${port}`)
    })
}

if (require.main === module) {
    starter().catch((err) => {
        debug('Error encountered while starting app: ', err)
    })
} else {
    exports.starter = power
}