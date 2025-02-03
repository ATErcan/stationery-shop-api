const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_MAX_AGE } = require("../config/jwt-config");

const createToken = (data) => {
  try {
    return jwt.sign(data, JWT_SECRET, { expiresIn: JWT_MAX_AGE });
  } catch (error) {
    throw new Error("Failed to create token");
  }
};

module.exports = { createToken };