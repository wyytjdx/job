var express = require("express");
var body = require("body-parser");
var session = require("express-session")
var path = require("path");
var mongostu = require("./my_modules/studentshandle.js");
var mongouse = require("./my_modules/usershandle.js");
var check = require("./my_modules/datahandle");
var app = express();
app.use(express.static(path.join(__dirname,"public")));
app.use(body.urlencoded({extended:"false"}));
app.use(session({
    secret:"hello",
    cookie:{maxAge:60*1000}
}))
app.set("view engine","jade");
app.listen(80,function () {
    console.log("loading");
})
app.get("/",function (req,res) {
    var value = req.query.info
    res.render("login",{info:value});
})
app.post("/users",function (req,res) {
    mongouse.getdata(function (data) {
        res.send(data);
    })
})
app.post("/students",function (req,res) {
    mongostu.getdata(function (data) {
        res.send(data);
    })
})
app.post("/enter",function (req,res) {
    check.checkuser(req.body,function (data,showname) {
        if(data==0){
            res.redirect("/?info=此用户不存在")
        }else if(data==1){
            req.session.username=showname;
            res.redirect("/center")
        }else if(data==2){
            res.redirect("/?info=密码错误")
        }
    })
})
app.get("/center",function (req,res) {
    if(req.session.username){
        res.render("layout",{showname:req.session.username});
    }else{
        res.redirect("/")
    }
})
app.post("/insert",function (req,res) {
    var options = req.body;
    var test = req.body.num;
    mongostu.test(test,function(num){
        if(num==0){
            mongostu.insert(options,function (data) {
                res.send(data);
            })
        }else if(num==1){
            var upoptions = {"num":test}
            mongostu.updata(upoptions,options,function (data) {
                res.send(data);
            })
        }
    })
})
app.post("/delete",function (req,res) {
    var options = req.body;
    mongostu.delete(options,function (data) {
        res.send(data);
    })
})

app.post("/find",function (req,res) {
    var options = {"num":req.body.num}
    var condition = req.body;
    mongostu.updata(options,condition,function (data) {
        res.send(data);
    })
})
app.post("/sort",function (req,res) {
    var options = req.body.sort;
    mongostu.sort(options,function (data) {
        res.send(data);
    })
})
app.post("/screen",function (req,res) {
    var condition = req.body;
    mongostu.screen(condition,function (data) {
        res.send(data);
    })
})
/////////////////////////////////////////////////////////////
app.post("/findemail",function (req,res) {
    var verify = req.body;
    mongouse.findemail(verify,function (num) {
        if(num==8){
            res.send("此邮箱已存在");
        }else if(num==9){
            res.send("ok")
        }
    })
})
app.post("/enroll",function (req,res) {
    var userdata = req.body;
    mongouse.insert(userdata,function () {
        res.send("注册成功！")
    })
})
app.post("/userdelete",function (req,res) {
    var cond = req.body;
    mongouse.delete(cond,function (data) {
        res.send(data);
    })
})