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
        _id: user._id,
        isAdmin: user.isAdmin,
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

async function updateUserById(userId, updates) {
  const { name, lastName } = updates;

  const user = await User.findById(userId);
  if (!user) {
    throw createError("User not found! If this error persists, please contact support", 404);
  }

  user.name = name;
  user.lastName = lastName;

  await user.save();
  return user;
}

module.exports = { createUser, checkUser, updateUserById };
