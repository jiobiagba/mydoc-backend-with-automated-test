const express = require('express'),
    router = express.Router(),
    controller = require('../controller/controller')


//Monk has been changed to Mongoose

//Route for posting
router.post('/api/v1/:object', controller.postOne)
//Route for getting value without timestamp
router.get('/api/v1/:object/:mykey', controller.getOne)

module.exports = router