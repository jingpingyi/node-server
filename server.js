

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
		pathObj.pathname += 'index.html'
	}

	var filePath = path.join(staticPath, pathObj.pathname)
	// var fileContent = fs.readFileSync(filePath, 'binary')

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

// 
// 
// // 
// var http = require('http')
// var url = require('url')
// var path = require('path')
// var fs = require('fs')
// // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// var server = http.createServer(function(request, response){
// 	routePath(request, response)
// }).listen(8080)
// console.log('visit http://localhost:8080')
// // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// var routes = {
// 	'/a': function(request, response){
// 		response.end(JSON.stringify(request.query))
// 	},
// 	'/b': function(request, response){
// 		response.end('match /b')
// 	},
// 	'/c': function(request, response){
// 		response.end('match /c')
// 	},
// 	'/search': function(request, response){
// 		response.end('username='+request.body.username+',password'+request.body.password)
// 	}
// }
// // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// function routePath(request, response){
// 	var pathObj = url.parse(request.url, true)
// 	var handleFn = routes[pathObj.pathname]
// 	if (handleFn){
// 		request.query = pathObj.query
		
// 		var body = ''
// 		request.on('error', function(err){
// 			console.error(err)
// 		}).on('data', function(chunk){
// 			body += chunk
// 		}).on('end', function(){
// 			request.body = parseBody(body)
// 			handleFn(request, response)
// 		})

// 	}else{
// 		staticRoot(path.join(__dirname, 'sample'), request, response)
// 	}
// }
// // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// function staticRoot(staticPath, request, response){
// 	var pathObj = url.parse(request.url, true)
// 	var filePath = path.join(staticPath, pathObj.pathname)
// 	if(pathObj.pathname === '/'){pathObj.pathname += '/index.html'}
// 	fs.readFile(filePath, 'binary', function(err, content){
// 		if(err){
// 			response.writeHead(404, 'Not Found!')
// 			return response.end()
// 		}else{
// 			response.writeHead(200,'OK')
// 			response.write(content, 'binary')
// 			response.end()
// 		}
// 	})
	
// }
// // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// function parseBody(body){
// 	console.log(body)
// 	var obj = {}
// 	body.split('&').forEach(function(str){
// 		obj[str.split('='[0])] = str.split('=')[1]
// 	})
// 	return obj
// }