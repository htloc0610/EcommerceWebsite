const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");
const crypto = require("crypto");

module.exports = function (passport) {
  // Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;

          // Find user
          const user = await User.findOne({ email: email, isDeleted: false });

          if (!user) {
            return done(null, false, {
              message: "Email not registered in the system",
            });
          }
          if (!user.isVerified) {
            return done(null, false, { message: "User email not verified" });
          }
          // Return user
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Local Strategy
  passport.use(
    new LocalStrategy(
      {
        username: "username",
        password: "password",
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne({
            username: username,
            isDeleted: false,
          });
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
