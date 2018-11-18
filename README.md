# node.js服务器简单结构：

1. 四个基本模块：

    1.http：生成服务器；
    2.path：处理path；
    3.url：处理请求的ur；
    4.fs：读取文件，并返回。
  
2. 实现过程如下：
    ```js
    //生成服务器，接收请求，并响应,由函数routePath()完成
    http.createServer(function(req, res){
    routePath()
    }).listen(8080)
    //定义routes对象,包含各路由对应的方法。
    routes{
      '/a': function(){}，
      '/b': function(){}
      ...
    }
    //定义staticRoot()函数，处理静态请求
    function staticRoot(req, res){...}
    //定义routePath()函数
    function routePath(){
      if(route存在){
        do someting ...
      }else{
        staticRoot()
      }
    }
    ```
3. 对于POST请求，需要监听请求数据流，处理后再返回
    ```js
    let body = [];
    request.on('data', (chunk) => {
    body.push(chunk);
    }).on('end', () => {
    body = Buffer.concat(body).toString();
    // at this point, `body` has the entire request body stored in it as a string
    });
    ```
