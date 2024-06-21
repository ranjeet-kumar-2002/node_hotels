const mongoose = require('mongoose');
// define the MongoDB URL

const mongoURL =  'mongodb://localhost:27017/hotel' // "mongodb://localhost:27017/mydatabase" where mydatabase is the name of your MongoDB database.

// setup the mongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

// get the default connection 
// Mongoose maintain a default conncetion object reprsenting the MongoDB connection
const db = mongoose.connection;
// define the event lisners for databases
db.on('connected',()=>{
    console.log('connected to mongoDB server');
});

db.on('error',(err) => {
    console.error('mongoDB server connection error:',err);
});

db.on('disconnected',()=>{
    console.log('mongoDB server disconnected');
});

// Export the database connection
module.exports = db;

