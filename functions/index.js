const functions = require('firebase-functions');
const firebase = require('firebase-admin');
// var mqttServer = require('./mod/mqttServer.js');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
var bodyParser = require('body-parser');
var multer = require('multer');
var app		 			      = require('./mod/expressServ.js');
var expressServer 		= require('./mod/expressServer.js');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/', require('./mod/routes.js'));
app.use('/transmit', require('./mod/transmit.js'));


app.get('*', (req,res)=>{
    res.writeHead(404);
    res.end('<h1>404 Not Found</h1>');
});

exports.jspynio = functions.https.onRequest(app);
