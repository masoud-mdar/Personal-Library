const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
//const Browser = require("zombie")

//Browser.site = "https://boilerplate-project-library.masoudmdar.repl.co"

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai
        .request(server)
        .post("/api/books")
        .send({title: "test title"})
        .end(function(req, res){
          assert.equal(res.status, 200)
          assert.equal(res.type, "application/json")
          assert.equal(res.body.title, "test title")
          assert.property(res.body, "_id")
          done()
        })
        //done();
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai
        .request(server)
        .post("/api/books")
        .send({})
        .end(function(req, res){
          assert.equal(res.status, 200)
          assert.equal(res.text, "missing required field title")
          done()
        })
        //done();
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai
        .request(server)
        .get("/api/books")
        .end(function(req, res) {
          assert.equal(res.status, 200)
          assert.isArray(res.body)
          assert.property(res.body[0], "title")
          assert.property(res.body[0], "_id")
          assert.property(res.body[0], "comments")
          done()
        })
        //done();
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai
        .request(server)
        .get("/api/books/506b4d7e1e037108cb05637a")
        //.query({_id: "506b4d7e1e037108cb05637a"})
        .end(function(req, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, "no book exists")
          done()
        })
        //done();
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai
        .request(server)
        .get("/api/books/606c1fd4aafc6e00d9de35df")
        .end(function(req,res) {
          assert.equal(res.status, 200)
          assert.equal(res.type, "application/json")
          assert.equal(res.body._id, "606c1fd4aafc6e00d9de35df")
          assert.property(res.body, "title")
          assert.property(res.body, "comments")
          assert.isArray(res.body.comments)
          done()
        })
        //done();
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai
        .request(server)
        .post("/api/books/606c1fd4aafc6e00d9de35df")
        .send({comment: "cool"})
        .end(function(req, res) {
          assert.equal(res.status, 200)
          assert.equal(res.type, "application/json")
          assert.property(res.body, "_id")
          assert.property(res.body, "title")
          assert.property(res.body, "comments")
          assert.isArray(res.body.comments)
          assert.include(res.body.comments, "cool")
          done()
        })
        //done();
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai
        .request(server)
        .post("/api/books/606c1fd4aafc6e00d9de35df")
        .send({})
        .end(function(req, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, "missing required field comment")
          done()
        })
        //done();
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai
        .request(server)
        .post("/api/books/306c1fd4aafc6e00d9de37df")
        .send({comment: "good"})
        .end(function(req, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, "no book exists")
          done()
        })
        //done();
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai
        .request(server)
        .delete("/api/books/606c2bed76b0b9046b127930")
        .end(function(req, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, "delete successful")
          done()
        })
        //done();
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai
        .request(server)
        .delete("/api/books/504c2bed76b0b9046b121930")
        .end(function(req, res) {
          assert.equal(res.status, 200)
          assert.equal(res.text, "no book exists")
          done()
        })
        //done();
      });

    });

  });

});
