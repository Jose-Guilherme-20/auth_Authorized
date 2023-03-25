const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../model/user");
dotenv.config();

const notAuthorizedJson = { status: 401, message: "Não autorizado" };
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(options, async (payload, done) => {
    const user = await User.findByPk(payload.id);
    if (user) {
      return done(null, user);
    } else {
      return done(notAuthorizedJson, false);
    }
  })
);
const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET);
};
const privateRoute = (req, res, next) => {
  const authFunction = passport.authenticate("jwt", (err, user) => {
    req.user = user;
    if (user) {
      next();
    } else {
      next(notAuthorizedJson);
    }
  });
  authFunction(req, res, next);
};

module.exports = { passport, privateRoute, generateToken };
