const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken'); 
const connectDB = require('../database/db'); 

dotenv.config();
connectDB();

// JWT Strategy
const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

passport.use(new JWTStrategy(jwtOptions, async (token, done) => {
  try {
    const user = await User.findById(token.id).select('-password');
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

// Signup Strategy
passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return done(null, false, { message: 'Email already in use' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Prepare user data based on role
    const { role, full_name, bio, address, skill, areas_of_expertise, service_area, bvn } = req.body;
    const userData = {
      role,
      full_name,
      email,
      password: hashedPassword,
      address
    };

    if (role === 'consumer') {
      userData.bio = bio;
    } else if (role === 'skilled') {
      userData.skill = skill;
      userData.areas_of_expertise = areas_of_expertise;
      userData.service_area = service_area;
      userData.bvn = bvn;
    }

    // Create new user
    const newUser = new User(userData);

    await newUser.save();
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
}));

// Login Strategy
passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

module.exports = passport;