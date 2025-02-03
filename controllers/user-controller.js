const User = require("../models/User");
const { updateUserById } = require("../services/user-service");
const { createError } = require("../utils/errors");

const getUser = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw createError(
        "User not found! If this error persist, please contact support",
        404
      );
    }

    const userData = user.toObject();
    delete userData.password; 
    res.status(200).json({
      data: userData,
    });
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req;
    const { name, lastName } = req.body;

    const user = await updateUserById(userId, { name, lastName });

    const userData = user.toObject();
    delete userData.password; 

    res.status(200).json({ data: userData });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (val) => val.message
      );
      const combinedMessage = validationErrors.join(", ");
      return next(createError(`Validation Error: ${combinedMessage}`, 400));
    }
    return next(error);
  }
};

module.exports = { getUser, updateUser };
