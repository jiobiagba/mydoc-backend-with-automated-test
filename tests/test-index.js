const superagent = require('superagent')
const expect = require('expect')

//Describing how the apis should behave
describe('tests for http apis for mydoc challenge', allTests)

//Function which has all tests in it
function allTests() {
    //Variables for aiding test    
    let firstTime, secondTime, thirdTime, myKey
    const testData1 = { "drug": "Aspirin" }, testData2 = { "drug": "Procold" }

    /**Different test scenarios below
     * POST and GET are colled more than once to properly check if updated data and timestamped requests are handled correctly
     */
    it('posts object key and value', (done) => {
        superagent.post('http://localhost:4040/api/v1/object')
            .send(testData1)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(typeof res.body).toBe('object')
                expect(res.body._id.length).toBe(24)
                expect(res.body.key).toBe(Object.keys(testData1)[0])
                expect(res.body.value).toBe(Object.values(testData1)[0])
                expect(res.body.timestamp).not.toBe(null)
                firstTime = res.body.timestamp
                myKey = Object.keys(testData1)[0]
                done()
            })
    })

    it('gets latest value when no timestamp is given', (done) => {
        //Check here is to ensure key matches initial key and value change and timestamp matches when testData1 was posted
        superagent.get('http://localhost:4040/api/v1/object/' + myKey)
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
        superagent.post('http://localhost:4040/api/v1/object')
            .send(setTimeout(() => {
                return testData2
            }, 1500))
            .end((err, res) => {
                expect(err).toBe(null)
                expect(typeof res.body).toBe('object')
                expect(res.body._id.length).toBe(24)
                expect(res.body.key).toBe(Object.keys(testData1)[0])
                expect(res.body.value).toBe(Object.values(testData2)[0])
                expect(res.body.timestamp).not.toBe(null)
                expect(res.body.timestamp).toBeGreaterThan(firstTime)
                secondTime = res.body.timestamp
                done()
            })
    })

    it('gets latest value again when no timestamp is given', (done) => {
        superagent.get('http://localhost:4040/api/v1/object/' + myKey)
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
        superagent.get('http://localhost:4040/api/v1/object/' + myKey + '?timestamp=' + thirdTime)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(typeof res.body).toBe('object')
                expect(res.body.key).toBe(Object.keys(testData1)[0])
                expect(res.body.value).toBe(Object.values(testData1)[0])
                expect(res.body.timestamp).toBeGreaterThan(firstTime)
                expect(res.body.timestamp).toBeLessThanOrEqual(secondTime)
                done()
            })
    })
}