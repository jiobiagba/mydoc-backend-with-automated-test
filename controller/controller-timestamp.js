
exports.getOneWithTimestamp = async (req, res, next) => {
    try {
        const time = req.params.timestamp,
                key = req.params.mykey

        console.log('2nd GET Key: ', key)
        console.log('Sent Timestamp: ', time)
        const result = await req.collection.find({ key: key }, { sort: {timestamp: -1} })
        console.log('Returned results: ', result)
        const finalResult = result.find((item, index, array) => {
            return item.timestamp <= time
        })
        console.log('Needed results: ', finalResult)
        res.status(200).send(finalResult)
        return next()
    }

    catch (err) {
        return next(err)
    }
}