
const timeValue = () => {
    var now = new Date(),
        timestamp = now.getTime()
    console.log('Timestamp: ', timestamp)
    return timestamp
}

exports.postOne = async (req, res, next) => {
    try {
        const data = {
            key: Object.keys(req.body)[0],
            value: Object.values(req.body)[0],
            timestamp: timeValue()
        }

        const feedback = await req.collection.insert([data])

        res.status(200).json(feedback[0])
    }

    catch (err) {
        return next(err)
    }
}