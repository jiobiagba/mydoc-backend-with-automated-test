
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

        //First attempt an update
        const check = await req.collection.update({ key: data.key }, { $set: { value: data.value } })
        console.log('Present or Not? :' , check)
        if(check.n !== 0 || check.nModified !== 0) {
            const updated = await req.collection.findOne({ key: data.key }, { sort: [['timestamp', -1]] })
            console.log('Updated: ', updated)
            res.status(200).json(updated)
            return
        } else {
            //Failed update? Insert new data and send it as response
            const feedback = await req.collection.insert([data])
            console.log('Feedback: ', feedback)
            res.status(200).json(feedback[0])
            return
        }
    }

    catch (err) {
        return next(err)
    }
}