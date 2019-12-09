
const http= require('http'),
        port = process.env.PORT || 4040,
        express = require('express'),
        router = require('./routes/router'),
        routerTimestamp = require('./routes/router-timestamp'),
        mongoose = require('mongoose')

        //Mongoose setup
        mongoose.connect('mongodb://localhost/mydoc',  {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Error in Connection: '))
        db.once('open', () => {
            console.log('Connection to database established!')
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