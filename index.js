const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
//set static path
app.use(express.static(path.join(__dirname,'client')));

app.use(bodyParser.json());

const publicVapidKey = 'BB5gST2bBwe69DDsflG_OupR0M6kpiMzSODH97LbivgdACrHSdQcBfMZdplBLQtUs7G2HJ4ddKdeYigCIybppyE';
const privateVapidKey = '8C5781hFd2g5o_42c45mDDJPKGbNEx_EMENlkpEe9IQ';

webpush.setVapidDetails('mailto:ziyun@attitudetech.ie', publicVapidKey, privateVapidKey);

//subscribe route
app.post('/subscribe',(req,res) => {
  //Get push subscription object
  const subscription = req.body;

  //send 201 - resource created
  res.status(201).json({});

  //create payload
  const payload = JSON.stringify({
    title:'Push Test'
  });
  //pass object into sendNotification
  webpush.sendNotification(subscription,payload).catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
