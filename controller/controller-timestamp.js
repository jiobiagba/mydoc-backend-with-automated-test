
const InfoModel = require('../schema/schema')

exports.getOneWithTimestamp = async (req, res, next) => {
    try {
        const time = req.params.timestamp,
                key = req.params.mykey

        console.log('2nd GET Key: ', key)
        console.log('Sent Timestamp: ', time)
        const result = await InfoModel.find({ key: key }).sort({timestamp: -1})
        console.log('Returned results: ', result)
        const finalResult = result.find((item, index, array) => {
            return item.timestamp <= time
        })
        console.log('Needed results: ', finalResult)
        if(finalResult === undefined || finalResult === null) {
            res.status(404).json({
                msg: 'No record of this key being saved before this time.'
            })
            return
        }
        res.status(200).json(finalResult)
        return next()
    }

    catch (err) {
        res.status(500).json({
            msg: err
        })
        return
    }
}