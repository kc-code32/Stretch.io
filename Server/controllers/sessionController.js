const Session = require('../models/sessionModel');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = (req, res, next) => {

  // access mongodb using find session by using value of ssid as the cookieId value
  Session.findOne({ cookieId: req.cookies.ssid }, 
    (err, session) => {
      if (err) {
        return next({
          log: 'Error occurred in sessionController.isLoggedIn.',
          status: 500,
          message: { err: 'An error occurred in sessionController.isLoggedIn.' }
        });
      } else if (!session) {
        res.locals.signedIn = false;
        return next();
        // return res.redirect('/');
      } else {
        res.locals.signedIn = true;
        return next();
      }
    }
  )
};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = (req, res, next) => {
  //write code here  Session.create({cookieId: ....})
  console.log(res.locals.signedIn)
  if (res.locals.signedIn) {
    Session.create({ cookieId : res.locals.userId }, 
      (err, session) => {
        if (err) return next({
          log: 'Error occurred in sessionController.startSession.',
          status: 500,
          message: { err: 'An error occurred in sessionController.startSession.' }
        });
        else return next();
      });
  } else return next();
};

sessionController.clearSession = (req, res, next) => {
  Session.findOneAndDelete({ cookieId: req.cookies.ssid }, 
    (err, session) => {
      if (err) return next({
        log: 'Error occurred in sessionController.clearSession.',
        status: 500,
        message: { err: 'An error occurred in sessionController.clearSession.' }
      });
      else return next();
  });
};

module.exports = sessionController;
