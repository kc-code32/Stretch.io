const axios = require('axios');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

// init const userController, an object that stores the functionality
const userController = {};

// need to pass above object and the API key into the request to the API.
// we added some .env stuff, not being used as this page is sufficient
// having a .env folder for private info like an API key or database log in info is best practice
// but we didn't have time to implement/didn't need to because of the scope of this project

// The getStretches method is a function that accepts 3 params, req, res, next, and stores the result of a fetch request to the exercises api in our
userController.getStretches = async (req, res, next) => {
  try {
    const { muscle } = req.body;
    // init const apiRes as output from api request
    const response = await axios.get(
      `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}&type=stretching`,
      {
        headers: { 'x-api-key': 'SReYt5aEyGMKzrdSe87wew==boZAObqiLCiQPGrb' },
      }
    );
    // console.log(response.data);
    res.locals.apiRes = response.data;
    return next();
  } catch (error) {
    const errorObject = {
      // log to developer
      log: 'Error occurred in StretchController.GetExercise',
      // message to client
      message: { error: 'An error has occurred in getting an exericse' },
      status: 400,
    };
    // pass error object to global error handler
    return next(errorObject);
  }
};

userController.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    res.locals.signedIn = false;
    console.log('fail to create user, missing register info');
    return next();
  }

  User.create({ email, name, password }, (err, user) => {
    if (err) {
      res.locals.signedIn = false;
        return next();
      // return next({
      //   log: 'Error occurred in userController.createUser',
      //   status: 500,
      //   message: { err: 'An error occurred in userController.createUser' },
      // });
    } else {
      res.locals.userDetail = user;
      res.locals.userId = user.id;
      res.locals.signedIn = true;
      return next();
    }
  });
};

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 */
userController.verifyUser = (req, res, next) => {
  // write code here
  const { email, password } = req.body;
  if (!email || !password) {
    res.locals.signedIn = false;
    // return next();
    return next({
      log: 'Missing username or password in userController.verifyUser',
      status: 400,
      message: { err: 'An error occurred in userController.verifyUser'}
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      res.locals.signedIn = false;
      //   return next();
      return next({
        log: 'Error occurred in userController.verifyUser',
        status: 500,
        message: { err: 'An error occurred in userController.verifyUser' },
      });
    } else {
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (!result) {
            res.locals.signedIn = false;
            console.log('user entered incorrect password');
            return next();
          } else {
            res.locals.signedIn = true;
            res.locals.userDetail = user;
            res.locals.userId = user.id;
            return next();
          }
        })
        .catch((err) => {
          res.locals.signedIn = false;
          //   return next();
          return next({
            log: 'Error occurred in userController.verifyUser',
            status: 500,
            message: { err: 'An error occurred in userController.verifyUser' },
          });
        });
    }
  });
};

userController.getUserDetail = (req, res, next) => {
  const user = req.cookies.ssid;
  User.findOne({ _id: user }, (err, user) => {
    if (err) {
      // return next();
      return next({
        log: 'Error occurred in userController.verifyUser',
        status: 500,
        message: { err: 'An error occurred in userController.verifyUser'}
      });
    } else {
      res.locals.userDetail = user;
      return next();
    }
  });
}

userController.addFavorites = async (req, res, next) => {
  // console.log('userController.favs hit');
  try {
    const { email, name, equipment, difficulty, instructions } = req.body;
    const doc = await User.findOneAndUpdate(
      { email },
      {
        $push: { favStretches: { name, equipment, difficulty, instructions } },
      },
      { new: true }
    );
    res.locals.addedFavoriteList = doc.favStretches;
    // console.log('res.locals.favoriteList: ', res.locals.addedFavoriteList);
    return next();
  } catch (err) {
    return next({
      log: 'Error occurred in userController.favorites',
      status: 500,
      message: { err: 'An error occurred saving your favorite' },
    });
  }
};

userController.deleteFavorites = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const doc = await User.findOneAndUpdate(
      { email },
      {
        $pull: { favStretches: { name } },
      },
      { new: true }
    )
    .populate('favStretches'); // <- here's the change

    res.locals.deletedFavoritesList = doc.favStretches;
    // console.log('res.locals.favoriteList: ', res.locals.deletedFavoritesList);
    return next();
  } catch (err) {
    return next({
      log: 'Error occurred in userController.deleteFavorites',
      status: 500,
      message: { err: 'An error occurred removing your favorite' },
    });
  }
};

module.exports = userController;
