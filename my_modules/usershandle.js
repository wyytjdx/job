var mongoclient = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/mytrain";
function getData(next) {
    mongoclient.connect(url,function(err,db){
        db.collection("user").find().toArray(function(err,docs){
            next(docs);
            db.close();
        })
    })
}
function findEmail(verify,next) {
    //8重复
    //9不重复
    mongoclient.connect(url,function(err,db){
        db.collection("user").find(verify).toArray(function(err,docs){
            db.close();
            if(docs.length == 0){
                next(9);
            }else{
                next(8);
            }
        })
    })
}
function insertData(options,next) {
    mongoclient.connect(url,function(err,db){
        db.collection("user").insertOne(options,function () {
            next();
            db.close();
        })
    })
}
function deleteData(condition,next) {
    mongoclient.connect(url,function(err,db){
        db.collection("user").removeOne(condition,function () {
            getData(function (data) {
                next(data);
            })
            db.close();
        })
    })
}
module.exports = {
    getdata:getData,
    insert:insertData,
    delete:deleteData,
    findemail:findEmail
}