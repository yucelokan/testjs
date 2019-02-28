const http = require(`http`);
const fs = require(`fs`);

const server = http.createServer((request, response) => {
  console.log(`Bir istekte bulunuldu.`);
  response.writeHead(200, { "content-type": "text/html; charset=utf-8" });

  fs.readFile('htmls/index.html', (err, data) => {
    if (err != null) {
      response.end(err.toString());
    } else {
      response.end(data.toString());
    }
  });
});

server.listen(3000);
