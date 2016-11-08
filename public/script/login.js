/**
 * Created by Administrator on 2016/8/25.
 */
//正则验证
$("#bt").click(function(){
    if($("#email1").val()==""){
        $("p").text("邮箱不能为空");
        return false;
    }
    var email=$("#email1").val();
    if(!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)){
        $("p").text("email格式不正确！请重新输入");
        $("#email1").focus();
    }
})