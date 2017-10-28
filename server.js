const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const app = express();
app.use(bodyParser.json());
const path = require('path');
// const {bar,order} = require('./model');
const {PORT, DATABASE_URL} = require('./config');
// const {ACCOUNT_SID, AUTH_TOKEN} = require('./secret');




// const{DATABASE_URL,CLIENT_ID} = require('./secret')
// if(DATABASE_URL === null ){
//   DATABASE_URL = process.env.PORT
// }























app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



app.post('/textmsg', (req, res) => {

  // email 

  
 console.log('=================HIT==============')

 console.log(req.body.text)
 var string = req.body.text
 var dontlookhere = 'AC4334eb5e7984bfb826c66ce782578316'; 
 var randomnumber = 'fa7a4a8ab3761c09554af5fa8ac1e5e5'; 
 
 //require the Twilio module and create a REST client 
 var client = require('twilio')(dontlookhere, randomnumber); 
 
  client.messages.create({ 
      to: "+14085057277", 
      from: "+18316099667", 
      body: string , 
  }, function(err, message) { 
      console.log(message.sid); 
  }); 
    res.status(200).json({msg: 'this is working'})

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


















