const Joi = require('joi');

// Signup validation schema
const signupSchema = Joi.object({
  role: Joi.string().valid('consumer', 'skilled').required(),
  full_name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  photoURL: Joi.string().allow('').required(),
  videoURL: Joi.string().allow('').optional(),
  verified: Joi.boolean().default(false),
  ratings: Joi.number().default(0), 
  // Consumer fields
  bio: Joi.when('role', { is: 'consumer', then: Joi.string().allow('').optional() }),
  address: Joi.string().allow('').optional(),

  // Skilled person fields
  skill: Joi.when('role', { is: 'skilled', then: Joi.string().required(), otherwise: Joi.forbidden() }),
  areas_of_expertise: Joi.when('role', { is: 'skilled', then: Joi.string().optional(), otherwise: Joi.forbidden() }),
  service_area: Joi.when('role', { is: 'skilled', then: Joi.string().optional(), otherwise: Joi.forbidden() }),
  bvn: Joi.when('role', { is: 'skilled', then: Joi.string().optional(), otherwise: Joi.forbidden() }),
  bvn_URL: Joi.when('role', { is: 'skilled', then: Joi.string().optional(), otherwise: Joi.forbidden() }),
});

// Signin validation schema
const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// Hiring Request validation schema
const hiringRequestSchema = Joi.object({
  artisanId: Joi.string().required(),
  artisanName: Joi.string().required(),
  fullName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  jobDescription: Joi.string().min(5).required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
  startTime: Joi.string().required(),
  notes: Joi.string().allow('').optional(),
});

// Middleware for validating signup requests
const validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Middleware for validating signin requests
const validateSignin = (req, res, next) => {
  const { error } = signinSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Middleware for validating hiring requests
const validateHiringRequest = (req, res, next) => {
  const { error } = hiringRequestSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  signupSchema,
  signinSchema,
  validateSignup,
  validateSignin,
  hiringRequestSchema,
  validateHiringRequest
};