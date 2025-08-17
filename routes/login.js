var express = require("express");
var router = express.Router();
var passport = require("passport");


router.post(
  '/password',
  passport.authenticate('local', {
    successRedirect: '/memes',
    failureRedirect: '/login',
  })
);

router.get("/", function (req, res, next) {
  if (!req.user) {
    res.render("login", { user: null });
  } else {
    res.render("login", { user: req.user });
  }
});

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});



module.exports = router;
