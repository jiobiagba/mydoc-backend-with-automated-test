const express = require('express'),
    router = express.Router(),
    controllerTimestamp = require('../controller/controller-timestamp')

//Monk has been changed to Mongoose

router.get('/api/v1/:object/:mykey/:timestamp', controllerTimestamp.getOneWithTimestamp)

module.exports = router