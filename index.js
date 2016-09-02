const express = require('express')
    , bodyParser = require('body-parser')
    , config = require('./config')
const PubNub = require ('pubnub');

// // get/create/store UUID
// var UUID = PubNub.db.get('session') || (function(){
//     var uuid = PubNub.uuid();
//     PubNub.db.set('session', uuid);
//     return uuid;
// })();

var pubnub = new PubNub({
    subscribeKey: config.testSubscribeKey,
    publishKey: config.testPublishKey,
    secretKey: config.testSecretKey,
    logVerbosity: true,
    uuid: "0bbb304b-13ae-4fd7-9f5e-e3596e520b6c",
    ssl: true,
    presenceTimeout: 130,
})


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/node_modules', express.static('./node_modules'));
app.use(express.static('./public'));

pubnub.addListener({
  message: function(message) {
    console.log(message);
  },
  presence: function(presence) {
    console.log(presence)
  },
  status: function(status) {
    console.log(status);
  }
})

pubnub.subscribe({
    channels: ['my_channel'],
    withPresence: true // also subscribe to presence instances.
})

app.post('/test', function (req, res, next) {
  console.log(req.body);
})

const port = 5000;
app.listen(port, function() {
  console.log('Listening on port');
})
