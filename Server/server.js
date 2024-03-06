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

/**
 * handle requests for static files
 */
app.use('/assets', express.static(path.join(__dirname, '../client/assets')));

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));


// send server req to serverRouter
app.use('/api', serverRouter);

// serve index.html on the route '/'
app.get('/*', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});


/**
 * 404 handler
 */
app.use('*', (req,res) => {
  return res.status(404).send('Not Found');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log : 'Express error handler caught unknown middleware error',
    status : 400,
    message : {err: 'An error occurred'}
  }
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});



// listener

app.listen(PORT, () => console.log(`listening on ${PORT}`));
