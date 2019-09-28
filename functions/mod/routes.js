var app = require('express').Router();
var api = require('./api.js');
//used to see recieved data and sent data
app.post("/",(req,res)=>{
	res.writeHead(200);
	res.end();
});



app.get("/:email/:password",(req,res)=>{
	var email = req.params.email;
	var password = req.params.password;
	
});

app.get('/api',(req, res)=>{
	res.writeHead(200);
	res.end(api());
	//console.log(api());
});


module.exports = app;