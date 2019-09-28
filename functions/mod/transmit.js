var app = require('express').Router();
const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const http = require('http');
const firebaseApp = firebase.initializeApp(
	functions.config().firebase
);

app.get('/status/:api/:status',(req,res)=>{
  var str = req.params.api;
  var n = str.charAt(0);
  if (n === '0'){
  firebaseApp.database().ref("apiStatus/"+req.params.api+"/status").set(parseInt(req.params.status));
  
  }
  res.writeHead(200);
    res.end();
});

app.post('/sensor', (req, res) => {
    var processedValue = sensorFunction(req.body.sensorName, parseInt(req.body.value));
    firebaseApp.database().ref("smartHome/"+req.body.uid+"/"+req.body.uid+"-Sensors/"+req.body.sensorName+"/"+req.body.sensorLocation+"/"+req.body.date+"/"+req.body.time).set(parseInt(processedValue));
    
    res.writeHead(200);
    res.end();
});

app.get('/sensor/:uid/:sensorName/:sensorLocation/:date/:time/:value', (req, res) => {
    var processedValue = sensorFunction(req.params.sensorName, parseInt(req.params.value));
   	
    firebaseApp.database().ref("smartHome/"+req.params.uid+"/"+req.params.uid+"-Sensors/"+req.params.sensorName+"/"+req.params.sensorLocation+"/"+req.params.date+"/"+req.params.time).set(parseInt(processedValue));

    res.writeHead(200);
    res.end();
});



app.post('/',(req,res)=>{
	transmit(req.body.api,req.body.gpioValue,req.body.pin);
  //console.log(req.body.api+" "+req.body.gpioValue);
	res.writeHead(200);
	res.end();
});
app.get("/:api(*0*8*0*9*j*s*p*n*)/:pin/:gpioValue" , (req, res) =>{
  	transmit(req.params.api,req.params.gpioValue,req.params.pin);
  	res.writeHead(200);
	  res.end();
});

var sensorFunction = ( sensorName, value)=> {
	var fnVal = value;
  switch(sensorName)
  {
    case "Temperature-Sensor": 
      	fnVal = tempSensor('cel',value);
    	break;

    case "Temperature-Sensor-18B20": 
        fnVal = value;
      break;

    case "Waterflow-Sensor":
    	 fnVal = value;
    	break;

    case "Flame-Sensor":
    	 fnVal = value;
    	break;

    case "Light-Sensor":
    	 fnVal = (value/1024) * 100;
    	break;

    case "Soil-Humidity-Sensor":
    	 fnVal = (value/1024) * 100;
    	break;

    case "Raw-Sensor":
      	fnVal = value;
    	break;

    default:

  }

  return fnVal;
}

var tempSensor = (parameter,value) =>{
    var mv =  parseInt(value)* 4.88; 
    //console.log(mv);
    var celc = mv/10;
    var farhc = (celc*9)/5 + 32;
    if (parameter === 'cel') {
      return celc/2;
    }
    else{
      return farhc;
    }
  }

var transmit = (api, gpioValue,pin) =>{
	// if(gpioValue === "on"){
	// 	firebaseApp.database().ref('GPIO/'+api+'/'+pin).set(1);
	// }
	// else if (gpioValue === "off") {
	// 	firebaseApp.database().ref('GPIO/'+api+'/'+pin).set(0);
	// }
	// else{
	// 	firebaseApp.database().ref('GPIO/'+api+'/'+pin).set(parseInt(gpioValue) );
	// }
  http.get('http://[server.ip]/transmit/'+api+'/'+pin+gpioValue);

	
}
module.exports = app;