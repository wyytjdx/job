/**
 * Created by Administrator on 2016/8/25.
 */
$.ajax({
    method:"post",
    url:"/students"
}).done(function(data){
    show(data)
})
$.ajax({
    method:"post",
    url:"/users"
}).done(function (data) {
    showuser(data)
})
$("#sortform").submit(function(){
    var data = $(this).serialize();
    // console.log(data)
    $.ajax({
        method:"post",
        url:"/sort",
        data:data
    }).done(function(data){
        show(data);
    }).fail(function(){
        alert("fail");
    })
    return false;
})
$("#screenform").submit(function(){
    var data = $(this).serialize();
    // console.log(data)
    $.ajax({
        method:"post",
        url:"/screen",
        data:data
    }).done(function(data){
        show(data);
    }).fail(function(){
        alert("fail");
    })
    return false;
})
function show(data){
    $("#stutable #stutbody").empty();
    for(var i=0;i<data.length;i++){
        var tr = $("<tr>")
        for(var j in data[i]){
            var td = $("<td>");
            td.text(data[i][j])
            tr.append(td);
        }
        tr.append("<td><button class='del' data_num='" + data[i].num + "'>删除</button></td>")
        tr.append("<td><button class='upd' data_num='" + data[i].num + "'>修改</button></td>")
        $("#stutable #stutbody").append(tr)
    }
}
function showuser(data){
    $("#usetable #usetbody").empty();
    for(var i=0;i<data.length;i++){
        var tr = $("<tr>")
        for(var j in data[i]){
            var td = $("<td>");
            td.text(data[i][j])
            tr.append(td);
        }
        tr.append("<td><button class='del' data_num='" + data[i].email + "'>删除</button></td>")
        $("#usetable #usetbody").append(tr)
    }
}
$("#usetable #usetbody").delegate(".del","click",function(){
    var number = $(this).attr("data_num");
    var condition = {"email":number};
    if(confirm("是否删除此条数据？")){
        $.ajax({
            "method":"post",
            "url":"/userdelete",
            "data":condition
        }).done(function(data){
            showuser(data);
        })
    }
})
$("#stutable #stutbody").delegate(".del","click",function(){
    var number = $(this).attr("data_num");
    var condition = {"num":number};
    if(confirm("是否删除此条数据？")){
        $.ajax({
            "method":"post",
            "url":"/delete",
            "data":condition
        }).done(function(data){
            show(data);
        })
    }
})
$("#stutable #stutbody").delegate(".upd","click",function(){
    $('#myModal').modal('show');
    $("#myModal input").val("");
    var value = $(this).attr("data_num");
    $(".fixnum").val(value).attr("readonly","readonly");
})
//添加
$("#tj").click(function(){
    $('#myModal').modal('show');
    $("#myModal input").val("").removeAttr("readonly");
})
$("#myform").submit(function(){
    var data = $(this).serialize();
    // console.log(data)
    $.ajax({
        method:"post",
        url:"/insert",
        data:data
    }).done(function(data){
        show(data);
    }).fail(function(){
        alert("fail");
    })
    $('#myModal').modal("hide")
    return false;
})
//两表之间的切换
$(".header .navlist li").click(function () {
    var i = $(this).index();
    $(".containerr .containerstu").eq(i).removeClass("active").siblings().addClass("active");
    $(this).css("background-color","#337ab7").siblings().css("background-color","#fff")
})