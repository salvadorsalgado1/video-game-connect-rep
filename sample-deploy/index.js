const express = require('express')
const serverStatic = require('serve-static');
const path = require('path')

const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser');
const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());

const connection = 'mysql://b46b97070da880:b3868440@us-cdbr-east-02.cleardb.com/heroku_9d71c00de03ad70?reconnect=true';


if(process.env.NODE_ENV === 'production'){
  //Set static folder
  app.use(express.static(__dirname + '/public/'));
  app.get('*', (req,res)=>res.sendFile(__dirname + '/public/index.html'))
}
const port = process.env.PORT || 5000;

app.listen(port, ()=>{
  console.log(`Server running on port ${port}`);
})

console.log("Current Environment: " + process.env.NODE_ENV)

const db = mysql.createConnection(connection, {useNewUrlParser: true});

app.get('/api/get', (req, res)=>{
  const sqlGetHome = "SELECT * FROM heroku_9d71c00de03ad70.titles LIMIT 15;"
  db.query(sqlGetHome, (err, result)=>{
    res.send(result)
  })
})


