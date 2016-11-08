var mongoclient = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/mytrain";
//得到数据
function getData(next) {
    mongoclient.connect(url,function(err,db){
        db.collection("students").find().toArray(function(err,docs){
            next(docs);
            db.close();
        })
    })
}
//测试是添加还是修改
//0插入
//1修改
function test(test,next) {
    mongoclient.connect(url,function(err,db){
        var condition = {"num":test}
        db.collection("students").find(condition).toArray(function(err,docs){
            db.close();
            if(docs.length == 0){
                next(0)
            }else if(docs[0].num === test){
                next(1);
            }
        })
    })
}
//筛选
function screen(condition,next) {
    mongoclient.connect(url,function(err,db){
        db.collection("students").find(condition).toArray(function(err,docs){
            next(docs);
            db.close();
        })
    })
}
//排序
function sort(condition,next) {
    mongoclient.connect(url,function(err,db){
        db.collection("students").find().toArray(function(err,docs){
            if(condition == "age"){
                for(var i=docs.length;i>1;i--){
                    for(var j=0;j<i-1;j++){
                        if(Number(docs[j].age)>Number(docs[j+1].age)){
                            var t = docs[j];
                            docs[j] = docs[j+1];
                            docs[j+1]=t;
                        }
                    }
                }
                next(docs);
            }else{
                for(var i=docs.length;i>1;i--){
                    for(var j=0;j<i-1;j++){
                        if(Number(docs[j].score)>Number(docs[j+1].score)){
                            var t = docs[j];
                            docs[j] = docs[j+1];
                            docs[j+1]=t;
                        }
                    }
                }
                next(docs);
            }
            db.close();
        })
    })
}
//插入
function insertData(options,next) {
    mongoclient.connect(url,function(err,db){
        db.collection("students").insertOne(options,function(){
            getData(function (data) {
                next(data);
            })
            db.close();
        })
    })
}
//删除
function deleteData(condition,next) {
    mongoclient.connect(url,function(err,db){
        db.collection("students").removeOne(condition,function(){
            getData(function (data) {
                next(data);
            })
            db.close();
        })
    })
}
//更新
function updataData(options,condition,next) {
    mongoclient.connect(url,function(err,db){
        db.collection("students").updateOne(options,condition,function(){
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
    updata:updataData,
    sort:sort,
    screen:screen,
    test:test
}