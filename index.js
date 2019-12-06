
const http= require('http'),
        port = process.env.PORT || 4040,
        express = require('express')

/* Monk will be used to quickly set up APIs by aiding quick and schemaless connection to MongoDB
Once tests are up and running, Mongoose will be used for Schema functionality and online deployment
*/
const monk = require('monk'),
    url = 'mongodb://127.0.0.1:27017/mydoc',
    db = monk(url),
    timeValue = () => {
        var now = new Date(),
            timestamp = now.getTime()
        console.log('Timestamp: ', timestamp)
        return timestamp
    }

const app = express()

app.use(express.json())
app.use(express.urlencoded( { extended: false }))

/**
 Extract object collection from url params
 */
app.param('object', (req, res, next, object) => {
    req.collection = db.get(object) //This helps query the right collection from the URL supplied
    return next() 
})

app.post('/api/v1/:object', async (req, res, next) => {
    try {
        console.log('Incoming data: ', req.body)
        const data = {
            key: Object.keys(req.body)[0],
            value: Object.values(req.body)[0],
            timestamp: timeValue()
        }

        console.log('Data to post: ', data)

        const feedback = await req.collection.insert([data])
        console.log('Feedback: ', feedback)

        res.status(200).send(feedback)
    }

    catch (err) {
        return next(err)
    }
})

const server = http.createServer(app)
server.listen(port, () => {
    console.info(`Server running on port ${port}`)
})
