const express = require('express'),
    router = express.Router(),
    controller = require('../controller/controller')


/* Monk will be used to quickly set up APIs by aiding quick and schemaless connection to MongoDB
Once tests are up and running, Mongoose will be used for Schema functionality and online deployment
*/
const monk = require('monk'),
    url = 'mongodb://127.0.0.1:27017/mydoc',
    db = monk(url)

/**
 Extract object collection from url params
 */
router.param('object', (req, res, next, object) => {
    req.collection = db.get(object) //This helps query the right collection from the URL supplied
    return next() 
})

router.post('/api/v1/:object', controller.postOne)

module.exports = router