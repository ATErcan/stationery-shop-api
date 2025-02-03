const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_MAX_AGE } = require("../config/jwt-config");
const { createError } = require("./errors");

const createToken = (data) => {
  try {
    return jwt.sign(data, JWT_SECRET, { expiresIn: JWT_MAX_AGE });
  } catch (error) {
    throw new Error("Failed to create token");
  }
};

const decodeToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw createError("Token has expired", 401);
    }
    if (error.name === "JsonWebTokenError") {
      throw createError("Invalid token", 401);
    }
    throw createError("Failed to decode token", 500);
  }
};

module.exports = { createToken, decodeToken };