const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const multer = require('multer');
//const upload = multer({dest: './upload'})
const selectAll = "SELECT * FROM user";

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect(err => {
  if(err){
    return err;
  }
});


app.use(cors());

app.get('/',(req,res,err) => {
  //console.log(req);
  // console.log(err);
  res.send(`hello from the products server`);
})
app.get('/api/test',(req,res,err) => {
  //console.log(req);
  // console.log(err);
    connection.query(
      "SELECT * FROM user",
      (err,rows,fields) => {
        res.send(rows);
      }
    );
});


app.listen(port, () => console.log(`Listening on port ${port}`));