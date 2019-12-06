const superagent = require('superagent')
const expect = require('expect')

//Describing how the apis should behave
describe('tests for http apis for mydoc challenge', allTests)

//Function which has all tests in it
function allTests() {
    //Provision for saving id and timestamps
    let id
    let timeSaver
    let timeValue = () => {
        var now = new Date(),
            timestamp = now.getTime()
        console.log('Timestamp: ', timestamp)
        return timestamp
    }

    it('posts object key and value', (done) => {
        superagent.post('http://localhost:4040/api/v1/object')
            .send({
                key: 'drug-name',
                value: 'Paracetamol',
                timestamp: timeValue()
            })
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.body.length).toBe(1)
                expect(res.body[0]._id.length).toBe(24)
                timeSaver = res.body[0].timestamp
                console.log('Timesaver: ', timeSaver)
                id = res.body[0]._id
                done()
            })
    })
}