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

var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')

function staticRoot(staticPath, req, res){
	console.log('staticPath:' + staticPath)
	console.log('staticPath2:' + path.join(__dirname, 'sample'))
	console.log('当前目录：' + __dirname)
	console.log('req.url' + req.url)

	var pathObj = url.parse(req.url, true)
	console.log(pathObj)
	if(pathObj.pathname === '/'){
		pathObj.pathname += 'test.html'
	}

	var filePath = path.join(staticPath, pathObj.pathname)
	var fileContent = fs.readFileSync(filePath, 'binary')

	fs.readFile(filePath, 'binary', function(error, fileContent){
		if(error){
			console.log('404')
			res.writeHead(404, 'not found')
			res.end('<h1>404 Not Found</h1>')
		}else{
			console.log('ok')
			res.writeHead(200,'OK')
			res.write(fileContent, 'binary')
			res.end()
		}
	})
}

console.log(path.join(__dirname, 'sample'))

var server = http.createServer(function(req, res){
	staticRoot(path.join(__dirname, 'sample'), req, res)
})

server.listen(8080)
console.log('visit http://localhost:8080')