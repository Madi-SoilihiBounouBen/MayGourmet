const http = require('http');

const numeroPort = 3004;
const server = http.createServer(app);

server.listen(numeroPort, ()=> {
    console.log ("Le serveur de MayGourmet est à l'écoute sur le port", numeroPort);
});