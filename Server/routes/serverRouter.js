const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

// responses to different requests from front-end

router.post(
  '/', 
  userController.getStretches, 
  (req, res) => {
    return res.status(200).json(res.locals.apiRes);
  }
);

router.post(
  '/register',
  // sessionController.deleteSession,
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    return res.status(200).json({
      loggedIn: res.locals.signedIn,
      userDetail: res.locals.userDetail,
    });
  }
);

router.post(
  '/login',
  // sessionController.deleteSession,
  userController.verifyUser,
  // cookieController.setSSIDCookie,
  // sessionController.startSession,
  (req, res) => {
    return res.status(200).json({
      loggedIn: res.locals.signedIn,
      userDetail: res.locals.userDetail,
    });
  }
);

router.patch(
  //NEED ROUTE from Front End
  //KELVIN - Should we update below to '/favoriteAdd' ?
  '/favoriteAdd',
  userController.favorites,
  (req, res) => {
    return res.status(200).json({
      //NEED Return info from Front End
      addedFavoritesList: res.locals.addedFavoriteList,
    });
  }
);

router.patch(
  //NEED ROUTE from Front End
  '/favoriteDelete',
  userController.deleteFavorites,
  (req, res) => {
    return res.status(200).json({
      //NEED return info from Front End
      deletedFavoritesList: res.locals.deletedFavoritesList,
    });
  }
);

router.get('/isLoggedIn', sessionController.isLoggedIn, (req, res) => {
  return res.json({
    loggedIn: res.locals.signedIn,
    id: req.cookies.ssid,
  });
});

router.get(
  '/logout', 
  sessionController.clearSession,
  (req, res) => {
    return res.status(200).clearCookie('cookieId').redirect('/homepage');
  }
);

module.exports = router;
