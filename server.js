const express = require('express')
const app = express();
const db = require('./db');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req,body

// Import the router files
const personRoute = require('./routes/personRoute');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Use the routers
app.use('/person',personRoute);
app.use('/menu',menuItemRoutes);

app.get('/', function (req, res) {
    res.send('Hello World server hello sir')
  })
  

app.listen(3000 ,()=>{
    console.log("server is running on port 3000");
});

