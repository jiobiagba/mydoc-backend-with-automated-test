
const InfoModel = require('../schema/schema')

exports.postOne = async (req, res, next) => {
    try {
        const data = new InfoModel ({
            key: Object.keys(req.body)[0],
            value: Object.values(req.body)[0],
            timestamp: Date.now()
        })
        console.log('Data created: ', data)
        console.log('Timestamp from POST: ', data.timestamp)
        const feedback = await data.save()
        // const answer = {
        //     key: feedback.key,
        //     value: feedback.valueHolder.value,
        //     timestamp: feedback.valueHolder.timestamp
        // }
            // const feedback = await req.models.Data.insert([data])
            console.log('Feedback: ', feedback)
            res.status(200).json(feedback)
            return next()
    }

    catch (err) {
        return next(err)
    }
}


exports.getOne = async (req, res, next) => {
    try {
        const key = req.params.mykey
        //Later account for case of no value found
        console.log('Key: ', key)
        const result = await InfoModel.findOne({ key: key }).sort({timestamp: -1})
        console.log('Result fron GET: ', result)
        res.status(200).json(result)
        return next()
    }

    catch (err) {
        return next(err)
    }
}