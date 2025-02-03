const createUser = require("../services/user-service");
const { createToken } = require("../utils/auth-utils");

const signup = async (req, res, next) => {
  const { name, lastName, email, password } = req.body;

  try {
    const user = await createUser({ name, lastName, email, password });
    const token = createToken({
      _id: user._id,
      isAdmin: user.isAdmin,
    });

    res.status(201).json({
      jwt: {
        token,
      },
      user: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { signup };