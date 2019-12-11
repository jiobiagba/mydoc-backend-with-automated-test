
const InfoModel = require('../schema/schema')
const { body, validationResult, sanitizeBody } = require('express-validator')
const debug = require('debug')('controller')

exports.postOne = [
    body('*').isLength({ min: 1 }).trim().isAlphanumeric().withMessage('Key - Value pairs can only have alphanumeric values and CANNOT be empty.'),
    sanitizeBody('*').escape(),

    async (req, res, next) => {

        const err = validationResult(req)
        if(!err.isEmpty()) {
            debug('Error from validation & sanitization: ', err)
            res.status(400).json({
                msg: err
            })
            return
        }

        try {
            const data = new InfoModel ({
                key: Object.keys(req.body)[0],
                value: Object.values(req.body)[0],
                timestamp: Date.now()
            })

            if(data.key === null || data.key === undefined || data.value === null || data.value === undefined) {
                res.status(400).json({
                    msg: 'Key AND value MUST be provided'
                })
                return
            }
            
            const feedback = await data.save()
            res.status(200).json(feedback)
            return next()
        }
    
        catch (err) {
            res.status(500).json({
                msg: err
            })
            return
        }
    }
]


exports.getOne = async (req, res, next) => {
    try {
        const key = req.params.mykey
        const result = await InfoModel.findOne({ key: key }).sort({timestamp: -1})

        if(result === null || result === undefined) {
            res.status(404).json({
                msg: 'Key Not Found'
            })
            return
        }

        res.status(200).json(result)
        return next()
    }

    catch (err) {
        res.status(500).json({
            msg: err
        })
        return
    }
}