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
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    return res.status(200).json({
      loggedIn: res.locals.signedIn,
      userDetail: res.locals.userDetail,
    });
  }
);

router.patch(
  '/favoriteAdd',
  userController.addFavorites,
  (req, res) => {
    return res.status(200).json({
      addedFavoritesList: res.locals.addedFavoriteList,
    });
  }
);

router.patch(
  '/favoriteDelete',
  userController.deleteFavorites,
  (req, res) => {
    return res.status(200).json({
      deletedFavoritesList: res.locals.deletedFavoritesList,
    });
  }
);

router.get(
  '/isLoggedIn', 
  sessionController.isLoggedIn, 
  (req, res) => {
    return res.json({
      loggedIn: res.locals.signedIn,
      id: req.cookies.ssid,
  });
});

router.get(
  '/logout', 
  sessionController.clearSession,
  (req, res) => {
    return res.status(200).clearCookie('ssid').json({
      loggedIn: false,
    });
  }
);

module.exports = router;
