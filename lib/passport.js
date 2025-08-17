var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
// var userPassw = require("../data/users.json");
const fs = require("fs");
const path = require("path")




passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, {username: user.Username || user.username});
  });
});

passport.deserializeUser(function (sessionUser, cb) {
  try {
    const userPath = path.resolve(__dirname, "../data/users.json");
    const usersArray = JSON.parse(fs.readFileSync(userPath, "utf-8"));

    const fullUser = usersArray.find (
      u => (u.Username || u.username).toLowerCase() === sessionUser.username.toLowerCase()
    );
    if(!fullUser) {
      return cb(new Error("User not found"))
    }


    return cb(null, fullUser);
  } catch (err) {
    return cb(err);
  }
});



passport.use(
    new LocalStrategy(function verify(username, password, cb) {
        try {
           

            const usersPath = path.resolve(__dirname, "../data/users.json");
            
            const usersArray = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

            

            const uKey = String(username).trim().toLowerCase();
            const user = usersArray.find((u) => (u.Username).trim().toLowerCase() === uKey );

            

            if(!user) {
                console.log("No matching username");
                return cb(null, false);
            }
            
            if(String(user.Password) === String(password)) {
                console.log("password match");
                return cb(null, user);
            } else {
                console.log("password mismatch");
                return cb(null, false);
            }
        } catch (err) {
            console.error("Auth error", err);
            return cb(err);
        }
    })
);


module.exports = passport;