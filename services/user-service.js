const argon2 = require("argon2");

const User = require("../models/User");
const { createToken } = require("../utils/auth-utils");
const { createError } = require("../utils/errors");

const hashPassword = async (userData) => {
  const user = new User(userData);

  try {
    const hashedPwd = await argon2.hash(user.password, {
      type: argon2.argon2id,
    });
    user.password = hashedPwd;
    return user;
  } catch (error) {
    throw {
      message: "Failed to hash the password",
      statusCode: 500,
    };
  }
};

const createUser = async (userData) => {
  try {
    const user = await hashPassword(userData);
    await user.save();

    return user;
  } catch (error) {
    // duplicate email error
    if (error.code === 11000) {
      throw {
        message: "Email already in use",
        statusCode: 409, // Conflict
      };
    }

    // Other errors
    throw error;
  }
};

const checkUser = async(user, password) => {
  try {
    const verified = await argon2.verify(user.password, password);
    if(verified) {
      const token = createToken({
        id: user._id,
        name: user.name,
        email: user.email,
      });
      return token;
    } else {
      throw createError("Invalid email or password", 401);
    }
  } catch (error) {
    if (error.statusCode === 401) {
      throw error;
    }
    throw createError("Failed to verify password (server error)", 500);
  }
}

module.exports = { createUser, checkUser };
