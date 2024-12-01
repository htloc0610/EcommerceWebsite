const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");
const Admin = require("../models/adminUser.model");
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
    "user-login",
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

  // Chiến lược đăng nhập cho Admins
  passport.use(
    "admin-login",
    new LocalStrategy(
      {
        username: "username",
        password: "password",
      },
      async (username, password, done) => {
        try {
          const user = await Admin.findOne({
            username: username,
          });
          if (!user) {
            return done(null, false, { message: "User not found" });
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

  passport.serializeUser((entity, done) => {
    const userType = entity.role === "admin" ? "admin" : "user";
    done(null, { id: entity.id, type: userType });
  });

  passport.deserializeUser(async (obj, done) => {
    try {
      if (obj.type === "user") {
        const user = await User.findById(obj.id);
        done(null, user);
      } else if (obj.type === "admin") {
        const admin = await Admin.findById(obj.id);
        done(null, admin);
      } else {
        done(new Error("Invalid user type"));
      }
    } catch (err) {
      done(err);
    }
  });
};
