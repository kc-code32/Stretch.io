const User = require('../models/UserModel');
// const userController = require('./controllers/userController');

const cookieController = {};

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
  // write code here
  if (res.locals.signedIn) {
    const email = req.body.email;

    User.findOne({ email })
      .then(data => {
        const userID = data._id.toString();

        res.cookie('ssid', userID, {
          httpOnly: true,
          secure: true
        });

        next();
      })
      .catch(error => next({
        log : 'Error occurred in cookieController.setSSIDCookie',
        status : 400,
        message : {err: error}
      }))
  }
}

module.exports = cookieController;
