/*
 * 1.通过node.js进入聊天呢
 * 2.fs处理io文件处理
 * 3.开启socket服务
 * ES6 ECMASCRIPT2015 剔除不合理的语法
 */
var http = require("http");//引入http模块
var fs = require("fs");//引入fs模块
var ws = require("socket.io");

var server = http.createServer(function(req,res){
    var html = fs.readFileSync("./client.html");//同步方法
    //res.end("已经开启一个web服务")//响应  否则浏览器打不开
   //两个参数 req：请求 res：响应
   

     res.end(html);
    //console.log(res);
});//创建1个web服务
var io = ws(server);//启动socket  挂载到web上

//ws io服务监听到用户的连接事件
io.on("connection",function(socket){

    console.log("用户请求进入聊天室");
    //监听到socket当中的消息发送
    socket.on("message",function(mes){
       
        console.log(mes);
        //如果没有注明发给谁 那么就广
        io.emit("message",mes);//发送消息事件

    });

});
server.listen(3001);//监听到port端口