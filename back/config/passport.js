const passport = require("passport");
const User = require("../models/User");

passport.use(User.createStrategy());
//si quieres mas:
 //----
//esto es default
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

