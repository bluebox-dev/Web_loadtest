const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Mysql
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "dsflow",
    database: "DB_Backend"
});

con.connect();

// Get Status backend
app.get('/', (req, res) => {
  res.send('Server Status:Opened')
})

// Get list user all
app.get('/api/v1/user/', (req, res) => {
    con.query('select * from user', function(error, results){
      if ( error ){
        res.status(400).send('Error in database operation');
      } else {
        res.send(results);
      }
  });
})

// Get list number user
app.get('/api/v1/user/:id', (req, res) => {
  const csql = "select * from user where  `id` = "+req.params.id
  con.query(csql, function(error, results){
      if ( error ){
        res.status(400).send('Error in database operation');
      } else {
        res.send(results);
      }
  });
})

// Post Add 
app.post('/api/v1/user', (req, res) => {
  if(req.body.username!=null && req.body.password !=null)
  {
  const csql = "INSERT INTO `user`(`username`, `password`) VALUES ('"+req.body.username +"','"+req.body.password+"')"
  con.query(csql, function(error, results){
      if ( error ){
        res.status(400).send('Error in database operation');
      } else {
        res.status(201).json(results)
      }
  });
  }
  else{
    res.status(400).send('Error in sytax data');
  }
})

//Post check login
app.post('/api/v1/login',(req,res) =>{
  if(req.body.username!=null && req.body.password !=null)
  {
    const csql = "select id from user where  `username` = '"+req.body.username+"' && `password`='"+req.body.password+"'"
    con.query(csql, function(error, results){
      if ( error ){
        res.status(400).send('Error in database operation');
      } else {
        res.send(results);
      }
    })
  }
});


app.listen(3000, () => {
  console.log('Start server at port 3000.')
})