const express = require('express');
const http = require('http');
const path = require("path");
const bodyParser = require('body-parser');



const port = process.env.PORT
var app = express();
var server = http.createServer(app);





app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));
app.use(express.json());



app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./public/index.html'));
  });

app.get('/about', function(req,res){
    res.sendFile(path.join(__dirname,'./public/about.html'));
  });

app.get('/contact', function(req,res){
    res.sendFile(path.join(__dirname,'./public/contact.html'));
  });

app.post('/email', function(req,res){
   console.log(req.body);
   res.json('nice info')
  });

  app.listen(port || 3000 , () => {
    console.log(  "server running at " + port )
  })