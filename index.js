
const http= require('http'),
        port = process.env.PORT || 4040,
        express = require('express'),
        router = require('./routes/router')

const app = express()

app.use(express.json())
app.use(express.urlencoded( { extended: false }))

app.use('/', router)

const server = http.createServer(app)
server.listen(port, () => {
    console.info(`Server running on port ${port}`)
})