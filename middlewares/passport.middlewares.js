const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");
const crypto = require("crypto");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        username: "username",
        password: "password",
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ username });
          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          if (!user.isVerified) {
            return done(null, false, { message: "User email not verified" });
          }

          const hash = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");
          const isMatch = hash === user.password;

          if (!isMatch) {
            return done(null, false, { message: "Invalid password" });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
