var connect = require('connect');
connect.createServer(connect.static(__dirname+'/game')).listen(process.env.PORT);
console.log("Listening on port "+process.env.PORT);