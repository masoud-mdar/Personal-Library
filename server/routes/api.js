'use strict'

const ObjectID = require("mongodb").ObjectID

module.exports = function (app, myDataBase) {

  app.route('/api/books')
    .get(function (req, res){

      //let x = new ObjectID()
      //console.log(x)


      myDataBase.find({}).toArray((err, rec) => {
        if (err) console.error(err)
        //console.log(rec)
        let tempArr = rec.map(book => {
          return {title: book.title, _id: book._id}
        })
        res.json(tempArr)
      })
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
      let title = req.body.title;
      let author = req.body.author
      let added_by = req.body.added_by
      //response will contain new book object including atleast _id and title
      if (!title) {
        res.json({"error": "missing required field title"})
      } else if (!author) {
        res.json({"error": "missing required field author"})
      } else if (!added_by) {
        res.json({"error": "Internal Error! Try again later..."})
      } else {
        myDataBase.insertOne({
          title: title,
          author: author,
          added_by: added_by,
          added_on: new Date().toISOString(),
          updated_on: new Date().toISOString(),
          commentcount: 0,
          comments: []
        }, (err, doc) => {
          if (err) console.error(err)
          //console.log(doc.ops[0])
          res.json({title: doc.ops[0].title, _id: doc.ops[0]._id})
        })
      }
    })
    
    .delete(function(req, res){
      myDataBase.deleteMany({}, (err, obj) =>{
        if (err) console.error(err)
        res.send("complete delete successful")
      })
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      //console.log(req.params)

      let checkValid = ObjectID.isValid(req.params.id)
      if (!checkValid) {
        res.send("no book exists")
      } else {
        let bookid = new ObjectID(req.params.id)
        myDataBase.countDocuments({_id: bookid}, {limit: 1}, (err, num) => {
          if (err) console.error(err)
          if (!num) {
            res.send("no book exists")
          } else {
            myDataBase.findOne({_id: bookid}, (err, doc) => {
              if (err) console.error(err)
              res.json(doc)
              //res.json({"_id": bookid, title: doc.title, comments: doc.comments})
            })
          }
        })
      }
    })
    
    .post(function(req, res){
      //console.log("in post")
      
      let comment = req.body.comment;
      //console.log(comment)
      //json res format same as .get
      let checkValid = ObjectID.isValid(req.params.id)
      
      if (!checkValid) {
        //console.log("position 1")
        res.send("no book exists")
      } else {
        if (!comment) {
          //console.log("position 2")
          res.send("missing required field comment")
        } else{
          let bookid = new ObjectID(req.params.id)

          myDataBase.findOneAndUpdate(
            {_id: bookid},
            {
              $inc : {
                commentcount: 1
              },
              $push : {
                comments: comment
              },
              $set: {
                updated_on: new Date().toISOString()
              }
            },
            {
              upsert: false,
              new: true,
              returnOriginal : false,
              projection: {_id:1, title: 1, comments: 1}
              },
            (err, doc) => {
              if (err) console.error(err)
              if (!doc.value) {
                //console.log("position 5")
                res.send("no book exists")
              } else {
                //console.log("position 666")
                //console.log(doc.value)
                res.json(doc.value)
              }
            }
          )
        }
      }
    })

    .put(function(req, res){

      let {comments, commentcount} = req.body
      let bookid = new ObjectID(req.params.id)
      console.log(comments)

      if (!commentcount) {

        myDataBase.findOneAndUpdate(
          {_id: bookid},
          {
            $set: {
              comments: comments
            }
          },
          {"upsert": false, "new": true},
          (err, doc) => {
  
            if (err){
              console.error(err)
              res.json({"error": "Internal Error... Please Try Again Later!"})
            }
  
            if (!doc) {
  
              res.json({error: "could not update", "_id": bookid})
  
            } else{
              console.log(doc.value)
              res.json(doc.value)
            }
          }
        )

      } else {

        myDataBase.findOneAndUpdate(
          {_id: bookid},
          {
            $set: {
              comments: comments,
              commentcount: comments.length
            }
          },
          {"upsert": false, "new": true},
          (err, doc) => {

            if (err){
              console.error(err)
              res.json({"error": "Internal Error... Please Try Again Later!"})
            }

            if (!doc) {

              res.json({error: "could not update", "_id": bookid})

            } else{
              console.log(doc.value)
              res.json(doc.value)
            }
          }
        )
      }


      //console.log(comments)
    })
    
    .delete(function(req, res){
      
      //if successful response will be 'delete successful'
      let checkValid = ObjectID.isValid(req.params.id)
      if (!checkValid) {
        res.send("no book exists")
      } else {
        let bookid = new ObjectID(req.params.id)
        myDataBase.countDocuments({_id: bookid}, {limit:1}, (err, num) => {
          if (err) console.error(err)
          if (!num) {
            res.send("no book exists")
          } else {
            myDataBase.deleteOne({_id: bookid}, (err, obj) => {
              if (err) console.error(err)
              res.send("delete successful")
            })
          }
        })
      }
    });
  
};
