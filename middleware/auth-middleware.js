const { decodeToken } = require("../utils/auth-utils");
const { createError } = require("../utils/errors");

const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(createError("Unauthorized access", 401));
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = decodeToken(token);
    req.userId = decoded._id;
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = verifyUser;
