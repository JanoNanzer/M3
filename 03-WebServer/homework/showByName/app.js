var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http.createServer((req,res) => {
fs.readFile(`./images${req.url}.jpg`, (err,data)=>{
    if(err) {
        res.writeHead(404,{'Content-Type':'text/plain'})
        res.end('ERROR \nNo es una ruta correcta para doge')
    } else {
        res.writeHead(200,{'Content-Type':'image/jpeg'})
        res.end(data)
    }
    })
}).listen(1337, '127.0.0.1')

// if(req.url==='/'){
//     res.writeHead(200,{'Content-Type':'text/plain'})
//     res.end('Home -> elija entre\n /arcoiris - /badboy - /code - /resaca - /retrato - /sexy')
// }
// else if(req.url=== '/badboy'){
//     res.writeHead(200,{'Content-Type':'image/jpeg'})
//     let img = fs.readFile('./images/badboy_doge.jpg')
//     res.end(img)
// }
// else if(req.url=== '/code'){
//     res.writeHead(200,{'Content-Type':'image/jpeg'})
//     let img = fs.readFile('./images/code_doge.jpg')
//     res.end(img)
// }
// else if(req.url=== '/resaca'){
//     res.writeHead(200,{'Content-Type':'image/jpeg'})
//     let img = fs.readFile('./images/resaca_doge.jpg')
//     res.end(img)
// }
// else if(req.url=== '/retrato'){
//     res.writeHead(200,{'Content-Type':'image/jpeg'})
//     let img = fs.readFile('./images/retrato_doge.jpg')
//     res.end(img)
// }
// else if(req.url=== '/sexy'){
//     res.writeHead(200,{'Content-Type':'image/jpeg'})
//     let img = fs.readFile('./images/sexy_doge.jpg')
//     res.end(img)
// }
// else if(req.url=== '/arcoiris'){
//     res.writeHead(200,{'Content-Type':'image/jpeg'})
//     let img = fs.readFile('./images/arcoiris_doge.jpg')
//     res.end(img)
// }
// else{
//     res.writeHead(404,{'Content-Type':'text/plain'})
//     res.end('ERROR \nNo es una ruta correcta para doge')
//     }