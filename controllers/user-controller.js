const User = require("../models/User");

const getUser = async (req, res, next) => {
  try {
    const userId = req.userId;
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

module.exports = { getUser };
