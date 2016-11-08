var mongoclient = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/mytrain";
//登录验证
function checkuser(options,next) {
    //0此用户不存在
    //1进入
    //2密码错误
    mongoclient.connect(url,function(err,db){
        var condition = {"email":options.email}
        db.collection("user").find(condition).toArray(function(err,docs){
            db.close();
            if(docs.length == 0){
                next(0)
            }else if(docs[0].password === options.password){
                next(1,docs[0].username);
            }else{
                next(2)
            }
        })
    })
}
module.exports = {
    checkuser:checkuser
}