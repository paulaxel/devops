const http=require('http');
const fs =require('fs');
const path=require('path');

const host='localhost';
const port=8000;

const mimeTypes= {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '..jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg',
    '.ico': 'image/ico',
    '.pdf': 'application/pdf'
};

const publicDir=path.resolve(__dirname, 'public');
const requestListener=(req,res) =>{
    // Normalize the request path
    let reqPath=req.url === '/' ? 'index.html' : req.url;
    //  Strip query string - ?id123 shouldn't affect the file path
    reqPath=reqPath.split('?')[0]
    // RESOLVE PATH AND CHECK if it stays within publicDir
    const safePath = path.resolve(publicDir, '.'+reqPath);

    // critical security
    if(!safePath.startsWith(publicDir)){
        res.writeHead(403, {'x-content-Type-Options': 'nosniff'});
        res.end('Forbidden');
        return;
    }
    // check if file exist
    fs.stat(safePath, (err, stat)=>{
        if(err || !stat.isFile()){
            res.writeHead(404, {'X-Content-Type-Options'; 'nosniff'});
            res.end('File Not Found');
            return;
    }
    // Determine MIME
    const ext=path.extname(safePath).toLocaleLowerCase();
    const contentType=mimeType[ext] || 'application/octet-stream';
    res.setHeader("Content-Type", contentType);
    res.setHeader('X-Content-Type-Options', 'nosniff'); // prevents MIME sniffing attacks
    res.writeHead(200);

    // stream file
    const stream=fs.createReadStream(safePath);
    stream.pipe(res);
    stream.on('error', ()=>{
        res.writeHead(500, {'X-Content-Type-Options',})
    })



















    
}