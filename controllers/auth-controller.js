const User = require("../models/User");
const { createUser, checkUser } = require("../services/user-service");
const { createToken } = require("../utils/auth-utils");
const { createError, createValidationError } = require("../utils/errors");

const signup = async (req, res, next) => {
  const { name, lastName, email, password } = req.body;

  try {
    const user = await createUser({ name, lastName, email, password });
    const token = createToken({
      _id: user._id,
      isAdmin: user.isAdmin,
    });
    const userData = user.toObject();
    delete userData.password; 

    res.status(201).json({
      jwt: {
        token,
      },
      user: userData,
    });
  } catch (error) {
    const validationError = createValidationError(error);
    return next(validationError || error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw createError("Invalid email or password", 401);
    }

    const token = await checkUser(user, password);

    const userData = user.toObject();
    delete userData.password; 

    res.status(200).json({
      jwt: {
        token,
      },
      user: userData,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { signup, login };