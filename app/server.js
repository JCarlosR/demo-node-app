let express = require('express');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.get('/profile-picture', function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, {'Content-Type': 'image/jpg'});
  res.end(img, 'binary');
});

// use when starting application locally
// let mongoUrl = "mongodb://admin:password@localhost:27017";

// use when starting application as docker container
let mongoUrl = "mongodb://admin:password@mongodb";

const client = new MongoClient(mongoUrl, {useUnifiedTopology: true});
const mongoConnection = client.connect();

app.post('/update-profile', function (req, res) {
  let userObj = req.body;

  mongoConnection.then(() => {
    let db = client.db('my-db');
    userObj['userid'] = 1;

    let myquery = { userid: 1 };
    let newvalues = { $set: userObj };

    db.collection("users").updateOne(myquery, newvalues, {upsert: true}, (err, res) => {
      if (err) throw err;
    });

  }).catch((err) => {
    console.log('Error: ', err);
  });

  // Send response
  res.send(userObj);
});

app.get('/get-profile', function (req, res) {
  let response = {};

  // Connect to the db
  mongoConnection.then(() => {
    let db = client.db('my-db');

    let myquery = { userid: 1 };

    db.collection("users").findOne(myquery, (err, result) => {
      if (err) throw err;

      // Send response
      response = result;
      res.send(response ? response : {});
    });
  }).catch((err) => {
    console.log('Error: ', err);
  });
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});
