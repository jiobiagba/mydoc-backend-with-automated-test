const superagent = require('superagent')
const expect = require('expect')

//Describing how the apis should behave
describe('tests for http apis for mydoc challenge', allTests)

//Function which has all tests in it
function allTests() {
    //Provision for saving id and timestamps
    let id
    let timeSaver
    let keyHolder
    const testData = {
        "drug-name": "Paracetamol", 
    }

    it('posts object key and value', (done) => {
        superagent.post('http://localhost:4040/api/v1/object')
            .send(testData)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(typeof res.body).toBe('object')
                expect(res.body._id.length).toBe(24)
                expect(res.body.key).toBe(Object.keys(testData)[0])
                expect(res.body.value).toBe(Object.values(testData)[0])
                expect(res.body.timestamp).not.toBe(null)
                timeSaver = res.body.timestamp
                id = res.body._id
                keyHolder = res.body.key //This saves the key here which is 'title'
                console.log('Mykey: ', keyHolder)
                done()
            })
    })

    // it('gets latest value when no timestamp is given', (done) => {
    //     superagent.get('http://localhost:4040/api/v1/object' + keyHolder)
    //         .end((err, res) => {
    //             expect(err).toBe(null)
    //             expect(typeof res.body).toBe('object')
    //             expect()
    //         })
    // })
}