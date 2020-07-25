const express = require('express')
var MongoClient = require("mongodb").MongoClient;

const app = express()
const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/', function (req, res){
   MongoClient.connect(
     "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false",
     { useUnifiedTopology: true },
     function (err, client) {
       if (err) throw err;

       var db = client.db("questions");

       db.collection("qns")
         .find()
         .toArray(function (err, result) {
           if (err) throw err;

           res.json(result);
         });
     }
   ); 
});

function loaddata(){
    
}

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);