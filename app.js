const http=require('http'); // import http from 'http'
const server=http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello, World!');
})
const port = process.env.PORT || 8080;
server.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
});