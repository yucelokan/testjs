const http = require(`http`);

const server = http.createServer((request, response) => {
  console.log(`Bir istekte bulunuldu.`);
  response.writeHead(200, { "content-type": "text/html; charset=utf-8" });

    if (request.method === "GET"){
        if(request.url === "/"){
            response.end("index sayfasındasınız")
        }else if(request.url === "/iletisim"){
            response.end("iletisim sayfasındasınız")
        }else{
            response.end("bu sayfa yok")
        }
    }
});

server.listen(3000);