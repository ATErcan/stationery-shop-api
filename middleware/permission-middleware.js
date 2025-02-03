const { decodeToken } = require("../utils/auth-utils");
const { createError } = require("../utils/errors");

const isAdminUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(createError("Unauthorized access", 401));
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = decodeToken(token);
    req.user = decoded;
    if(!decoded.isAdmin) {
      return next(createError("Forbidden access", 403));
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = isAdminUser;
