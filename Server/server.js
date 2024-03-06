const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const serverRouter = require('./routes/serverRouter');
app.use(cookieParser());

// connect to MongoDB
const MONGO_URI = 'mongodb+srv://kelvinchen138:4k8LRm2HZm5FtkiN@stretchio.ls8p7y1.mongodb.net/?retryWrites=true&w=majority&appName=stretchIO';
// const MONGO_URI = 'mongodb+srv://brok3turtl3:admin@cluster0.owew19l.mongodb.net/';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'Stretchio'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

app.use(express.json());
// if you ever have a form on your frontend, express.urlencoded
app.use(express.urlencoded({ extended: true })); // this will be helpful for stringifying a form req from an .html file


// send server req to serverRouter
app.use('/api', serverRouter);


//REPLACE THIS WITH A NICE 404 PAGE
app.get('*', (req, res) => {
    res.send('API RUNNING!')
})
// global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occurred'},
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
})


// listener

app.listen(PORT, () => console.log(`listening on ${PORT}`));
