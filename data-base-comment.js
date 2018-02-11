const mongoose = require('mongoose');
let Schema = moongoose.Schema;


var Reports = new Schema({

    "location" :
    {
        "latitude" : Double,
        "longtitude" : Double,
        "locationName" : String
    },

    "type" : String,
    "message" : String,
    "datePosted" : Date,
    "resolved" : Boolean,
    "upvote" : Integer,
    "downvote" : Downvote

});


let Comment;// to be defined on new connection (see initialize)

module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
    let db = mongoose.createConnection("mongodb://chlwjdtn15:chlwjdtn12@ds231758.mlab.com:31758/fishkatsu");
    db.on('error', (err)=>{ 
    reject(err); // reject the promise with the provided error
    });
    db.once('open', ()=>{
    Comment = db.model("comments", Reports);
    resolve();
    });
    });
};


module.exports.addComment = (data) => {
    
        data.postedDate = Date.now();
    
        return new Promise((resolve, reject) => {
    
            var newComment = new Comment(data);
    
            newComment.save((err) => {
    
                if(err) {
    
                    reject("There was an error saving the comment: ${err}");
    
                } else {
    
                    resolve(newComment._id);
                }
            });
        });
 };
    
module.exports.getAllComments = () => {
    
            return new Promise((resolve, reject) => {
    
            Comment.find().sort({postedDate:1}).exec().then((data) => {
    
                resolve(data);
    
            }).catch((err) => {
    
                console.log('There was an error: ${err}');   
            });
        });
    };
    
 module.exports.addReply = (data) => {
    
        data.repliedDate = Date.now();
    
        return new Promise((resolve, reject) => {
    
            if (data._id == data.comment_id) {
    
                Comment.update({ _id: data.comment_id},
    
                { $addToSet: { replies: data}},
                { multi: false }).exec();
    
                resolve(data);
    
            }
    
        }).catch((err) => {
    
            reject("Error");
        });
};