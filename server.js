const express = require('express');
const http = require('http');
const path = require("path");
const bodyParser = require('body-parser');
const {google } = require ('googleapis')



const port = process.env.PORT
var app = express();
const id = '1Wp648_ZA5g7IcPlxxJK34M5AyUY27e9oxhifQk3WcyY';




app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));
app.use(express.json());
app.use(express.urlencoded())







async function authentication() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
  });

  const client = await auth.getClient();

  const sheets = google.sheets({
    version: 'v4',
    auth: client
  });

  return { sheets };
}

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./public/index.html'));
  });

app.get('/about', function(req,res){
    res.sendFile(path.join(__dirname,'./public/about.html'));
  });

app.get('/contact', function(req,res){
    res.sendFile(path.join(__dirname,'./public/contact.html'));
  });


app.post('/email', async(req,res)=>{
  console.log(req.body)



  try{
   const { name, email, phoneNumber, country , state, crop, quantity, addInfo } = req.body
   const {sheets} = await authentication();


   const status = sheets.spreadsheets.values.append({
     spreadsheetId: id,
     range: 'Sheet1',
     valueInputOption: 'USER_ENTERED',
     resource: {
       values: [
         [  name, email, phoneNumber, country , state, crop, quantity, addInfo ]
       ]
     }
   })
  
   if (status.status = 200){
     console.log('succesful')
     res.sendFile(path.join(__dirname,'./public/success.html'));
   }else{
     console.log('unsuccessful  ' + status)
   }

  } catch(err){
    console.log(err)
  }
  });


  app.listen(port || 3000 , () => {
    console.log(  "server running at " + port )
  })