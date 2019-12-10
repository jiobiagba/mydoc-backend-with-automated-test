const superagent = require('superagent'),
        expect = require('expect'),
        port = process.env.PORT || 4040,
        starter = require('../index').starter,
        ender = require('../index').shutdown,
        mongoose = require('mongoose'),
        url = process.env.MONGO_TEST_URI //For MongoDB Atlas


//Synchronous delay function to be used in place of setTimeOut
const waiter = (ms) => {
    const end = Date.now() + ms
    while (Date.now() < end) continue
}

describe('start server', function() {
    it.skip('should start server', async function() {
        await starter()
    })
})
//Describing how the apis should behave
describe('tests for http apis for mydoc challenge', allTests)


//Function which has all tests in it
function allTests() {
    //Variables for aiding test    
    let firstTime, secondTime, thirdTime, myKey
    const testData1 = { "ailment": "Headache" }, 
            testData2 = { "ailment": "Back Pain" }

    /**Different test scenarios below
     * POST and GET are colled more than once to properly check if updated data and timestamped requests are handled correctly
     */
    it('posts object key and value', (done) => {
        superagent.post('http://localhost:' + port + '/api/v1/object')
            .send(testData1)
            .end((err, res) => {
                console.log('Response: ', res.body)
                expect(err).toBe(null)
                expect(typeof res.body).toBe('object')
                expect(res.body.key).toBe(Object.keys(testData1)[0])
                expect(res.body.value).toBe(Object.values(testData1)[0])
                expect(res.body.timestamp).not.toBe(null)
                firstTime = res.body.timestamp
                console.log('First Time: ', firstTime)
                myKey = Object.keys(testData1)[0]
                done()
            })
    })

    it('gets latest value when no timestamp is given', (done) => {
        //Check here is to ensure key matches initial key and value change and timestamp matches when testData1 was posted
        superagent.get('http://localhost:' + port + '/api/v1/object/' + myKey)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(typeof res.body).toBe('object')
                expect(res.body.key).toBe(Object.keys(testData1)[0])
                expect(res.body.value).toBe(Object.values(testData1)[0])
                expect(res.body.timestamp).toBe(firstTime)
                done()
            })
    })

    it('posts another object - same key different value', (done) => {
            //2nd POST request is delayed for 1.2 seconds
            waiter(1200)
            //POST is executed
            superagent.post('http://localhost:' + port + '/api/v1/object')
                .send(testData2)
                .end((err, res) => {
                    expect(err).toBe(null)
                    expect(typeof res.body).toBe('object')
                    expect(res.body._id.length).toBe(24)
                    expect(res.body.key).toBe(Object.keys(testData1)[0])
                    expect(res.body.value).toBe(Object.values(testData2)[0])
                    expect(res.body.timestamp).not.toBe(null)
                    expect(res.body.timestamp).toBeGreaterThan(firstTime)
                    secondTime = res.body.timestamp
                    console.log('Second Time: ', secondTime)
                    done()
            })
    })

    it('gets latest value again when no timestamp is given', (done) => {
        superagent.get('http://localhost:' + port + '/api/v1/object/' + myKey)
            .end((err, res) => {
                //Check here is to ensure key matches initial key but value change correctly registered, and timestamp appropriately updated
                expect(err).toBe(null)
                expect(typeof res.body).toBe('object')
                expect(res.body.key).toBe(Object.keys(testData1)[0])
                expect(res.body.value).toBe(Object.values(testData2)[0])
                expect(res.body.timestamp).toBe(secondTime)
                done()
            })
    })

    it('gets value immediately less than or equal to given timestamp', (done) => {
        //thirdTime was done here to ensure firstTime and secondTime have both been gotten
        thirdTime = Math.round(firstTime + ((secondTime - firstTime) / 2))
        console.log('Third Time: ', thirdTime)
        superagent.get('http://localhost:' + port + '/timestamp/api/v1/object/' + myKey + '/' + thirdTime)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(typeof res.body).toBe('object')
                expect(res.body.key).toBe(Object.keys(testData1)[0])
                expect(res.body.value).toBe(Object.values(testData1)[0])
                expect(res.body.timestamp).toBeGreaterThanOrEqual(firstTime)
                expect(res.body.timestamp).toBeLessThanOrEqual(secondTime)
                done()
            })
    })

    after(() => {
        ender()
    })
}