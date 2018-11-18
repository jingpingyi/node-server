// var http = require('http')
// var server = http.createServer(function(request,response){
// 	setTimeout(function(){
// 		response.setHeader('Content-Type','text/plain; charset=utf-8')
// 		response.writeHead(200, 'ok')
// 		response.write('<html><head><meta charset="gbk" /><head>')
// 		response.write('<body>')
// 		response.write('<h1>HELLO!</h1></body></html>')
// 		response.end()
// 	},2000)
// })
// console.log('open http://localhost:8080')
// server.listen(8080)           
// 

// var http = require('http')
// var path = require('path')
// var fs = require('fs')
// var url = require('url')

// function staticRoot(staticPath, req, res){
// 	console.log('staticPath:' + staticPath)
// 	console.log('staticPath2:' + path.join(__dirname, 'sample'))
// 	console.log('当前目录：' + __dirname)
// 	console.log('req.url' + req.url)

// 	var pathObj = url.parse(req.url, true)
// 	console.log(pathObj)
// 	if(pathObj.pathname === '/'){
// 		pathObj.pathname += 'test.html'
// 	}

// 	var filePath = path.join(staticPath, pathObj.pathname)

// 	// var fileContent = fs.readFileSync(filePath, 'binary')
// 	// res.write(fileContent, 'binary')
// 	// res.end()

// 	fs.readFile(filePath, 'binary', function(error, fileContent){
// 		if(error){
// 			console.log('404')
// 			res.writeHead(404, 'not found')
// 			res.end('<h1>404 Not Found</h1>')
// 		}else{
// 			console.log('ok')
// 			res.writeHead(200,'OK')
// 			res.write(fileContent, 'binary')
// 			res.end()
// 		}
// 	})
// }

// console.log(path.join(__dirname, 'sample'))

// var server = http.createServer(function(req, res){
// 	staticRoot(path.join(__dirname, 'sample'), req, res)
// })

// server.listen(8080)
// console.log('visit http://localhost:8080')
// 
// 
// 
// 
var http = require('http')
var path = require('path')
var url = require('url')
var fs = require('fs')
 
 var routes = {
 	'/a': function(req, res){
 		res.end(JSON.stringify(req.query))
 	},
 	'/b': function(req, res){
 		res.end('match /b')
 	},
 	'/c': function(req, res){
 		res.end('match /c/123')
 	},
 	'/login': function(req, res){
 		res.setHeader('Content-Type', 'text/plain; charset=utf-8')
 		res.end('username='+req.body.username+',password='+req.body.password)
 	}
 }

 var server = http.createServer(function(req, res){
 	routePath(req, res)
 }).listen(8080)
 console.log('visti http://localhost:8080')

 function routePath(req, res){
 	var pathObj = url.parse(req.url, true)
 	var handleFn = routes[pathObj.pathname]
 	if(handleFn){
 		req.query = pathObj.query
 		//method is 'POST'
 		var body = ''
 		req.on('error', function(err){
 			console.error(err)
 		}).on('data', function(chunk){
 			body += chunk
 		}).on('end', function(){
 			req.body = parseBody(body)
 			handleFn(req, res)
 		})
 	}else {
 		staticRoot(path.resolve(__dirname, 'sample'), req, res)
 	}

 }
 function staticRoot(staticPath, req, res){
 	var pathObj = url.parse(req.url, true)
 	if(pathObj.pathname === '/'){
 		pathObj.pathname += 'index.html'
 	}
 	var filePath = path.join(staticPath, pathObj.pathname)
 	fs.readFile(filePath, 'binary',function(err,content){
 		if(err){
 			res.setHeader('Content-Type', 'text/html; charset=utf-8')
 			res.writeHead(404,'Not Found')
 			return res.end('<h1>访问的文件不存在!</h1>')
 		}else{
 			res.writeHead(200, 'OK')
 			res.write(content, 'binary') 
 			res.end()
 		}
 	})
 }
 function parseBody(body){
 	console.log(body)
 	var obj = {}
 	body.split('&').forEach(function(str){
 		obj[str.split('=')[0]] = str.split('=')[1]
 	})
 	console.log(obj)
 	return obj
 }