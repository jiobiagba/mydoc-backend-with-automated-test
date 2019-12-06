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

    it('posts object key and value', (done) => {
        superagent.post('http://localhost:4040/api/v1/object')
            .send({
                "drug-name": "Paracetamol", 
            })
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.body.length).toBe(1)
                expect(res.body[0]._id.length).toBe(24)
                timeSaver = res.body[0].timestamp
                console.log('Timesaver: ', timeSaver)
                id = res.body[0]._id
                console.log('Id: ', id)
                keyHolder = Object.keys(res.body[0])[0] //This saves the key here which is 'title'
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