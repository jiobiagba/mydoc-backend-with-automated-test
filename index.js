
const http= require('http'),
        port = process.env.PORT || 4040,
        path = require('path'),
        express = require('express'),
        compression = require('compression'),
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

            const url = process.env.MONGO_TEST_URI //For MongoDB Atlas
            //Mongoose setup
            mongoose.connect(localURL,  {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }) 
            
            const db = mongoose.connection
            db.on('error', console.error.bind(console, 'Error in database connection: '))
            db.once('open', () =>{
                console.log('Connection to database established!')
                server.listen(port, () => {
                console.info(`Server running on port ${port}`)
                })
            }) 
        }

const shutdown = () => {
    server.close
}

if (require.main === module) {
    starter().catch((err) => {
        console.error('Error encountered while starting app: ', err)
    })
} else {
    exports.starter = starter
    exports.shutdown = shutdown
}