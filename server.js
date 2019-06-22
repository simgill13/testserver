const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const app = express();
app.use(bodyParser.json());
const path = require('path');
const {PORT, DATABASE_URL} = require('./config');
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use('/static', express.static(path.join(__dirname, './public')))






app.post('/textmsg', (req, res) => { 
 console.log('=================HIT==============')

 console.log(req.body.text)
 var string = req.body.text
 var dontlookhere = 'AC930c602a19415f6adcfd5ea6b65e0aa1'; 
 var randomnumber = '96a2c9af4af6f0ed07ba09cd9afc218b'; 
 
 //require the Twilio module and create a REST client 
 var client = require('twilio')(dontlookhere, randomnumber); 
 
  client.messages.create({ 
      to: "+14086130163", 
      from: "+15012088987", 
      body: 'fuck toronto' , 
  }, function(err, message) { 
      console.log(message.sid); 
  }); 
    res.status(200).json({msg: 'this is working'})

})




app.post('/voice', (req, res) => {
console.log('=================VOICE HIT==============')
var dontlookhere = 'AC930c602a19415f6adcfd5ea6b65e0aa1'; 
var randomnumber = 'a57186f60f7135097766a680959f5345'; 
var client = require('twilio')(dontlookhere, randomnumber); 

client.calls
.create({
   url: 'https://971efc7f.ngrok.io/static/twiml.xml',
   to:  "+14086130163", 
   from: '+16046703322'
 })
.then(call => console.log(call.sid));
  res.status(200).json({msg: 'this is working'})

})



function sendmesg(){
  var dontlookhere = 'AC930c602a19415f6adcfd5ea6b65e0aa1'; 
  var randomnumber = 'a57186f60f7135097766a680959f5345'; 
  
  //require the Twilio module and create a REST client 
  var client = require('twilio')(dontlookhere, randomnumber); 
  
   client.messages.create({ 
       to: "+17788818374", 
       from: "+18625792333", 
       body: 'hi friend , so toronto sucks' , 
   }, function(err, message) { 
       console.log(message.sid); 
   }); 
}





// setInterval(()=>{
//   console.log('sending mesg')
//   // sendmesg()
// },2000)




var dontlookhere = 'AC930c602a19415f6adcfd5ea6b65e0aa1'; 
var randomnumber = 'a57186f60f7135097766a680959f5345'; 
var client = require('twilio')(dontlookhere, randomnumber); 

client.calls
.create({
   url:`https://dry-brook-12935.herokuapp.com/static/voice.xml`,
   to:  "+14086130163", 
   from: '+16046703322'
 })
.then(call => console.log(call.sid))
.catch((error)=>{
  console.log("++ERROR", error)
})









let server;
function runServer(databaseUrl=DATABASE_URL, port=PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}



if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};


















