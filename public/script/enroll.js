/**
 * Created by Administrator on 2016/8/26.
 */
//注册
//注册一个失去焦点的事件
$("#email").blur(function(){
    var data = $(this).serialize();
    $("h2").text("");
    ismail(this,data);
})
$("#username").blur(function(){
    isname(this);
})
$("#password").blur(function(){
    ispass(this);
})
function ismail(obj,data){
    var reg=/[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/;
    if(!reg.test(obj.value)){
        $(".email").text("请正确填写邮箱！");
        obj.value="";
    }else{
        $.ajax({
            method:"post",
            url:"/findemail",
            data:data
        }).done(function(data){
            if(data=="ok"){
                $(".email").text("");
                $(".emailimg").attr("src","./images/right.png");
            }else{
                $(".email").text(data);
                obj.value="";
            }
        }).fail(function(){
            alert("fail");
        })
    }
}
//校验登录名：只能输入5-20个以字母开头、可带数字、“_”、“.”的字串
function isname(obj) {
    var reg=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
    if (!reg.test(obj.value)){
        $(".username").text("请输入5-20以字母开头，可带数字、“_”、“.”的字串");
        obj.value="";
    }else{
        $(".username").text("");
        $(".usernameimg").attr("src","./images/right.png");
    }
}
function ispass(obj) {
    var reg=/^[0-9a-zA-Z_]{6,15}$/;
    if(!reg.test(obj.value)){
        $(".password").text("请输入6-15位字母与数字的组合");
        obj.value="";
    }else{
        $(".password").text("");
        $(".passwordimg").attr("src","./images/right.png");
    }
}
$("#myenrollform").submit(function(){
    var text1 = $("#email").val();
    var text2 = $("#username").val();
    var text3 = $("#password").val();
    if(text1&&text2&&text3){
        var data = $(this).serialize();
        // console.log(data)
        $.ajax({
            method:"post",
            url:"/enroll",
            data:data
        }).done(function(data){
            $("h2").text(data);
            $("#email").val("");
            $("#username").val("");
            $("#password").val("");
            $(".password").text("");
            $(".username").text("");
            $(".email").text("");
            $(".usernameimg").attr("src","");
            $(".emailimg").attr("src","");
            $(".passwordimg").attr("src","");
        }).fail(function(){
            alert("fail");
        })
    }else{
        $("h2").text("输入不能为空！");
    }
    return false;
})