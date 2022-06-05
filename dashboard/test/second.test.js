let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe("Testing Api",() => {
    it("should return 200 for health Check",(done) => {
        chai.request(`http://localhost:9700`)
        .get('/users')
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) => {
            throw err;
        })
    })
    it("should return 404 for health Check",(done) => {
        chai.request(`http://localhost:9700`)
        .get('/user')
        .then((res) => {
            expect(res).to.have.status(404);
            done();
        })
        .catch((err) => {
            throw err;
        })
    })
    it("should return 200 for adding user",(done) => {
        chai.request(`http://localhost:9700`)
        .post('/addUser')
        .send({"name":"Test User","isActive":true})
        .then((res) => {
            expect(res).to.have.status(200);
            done();
        })
        .catch((err) => {
            throw err;
        })
    })
})