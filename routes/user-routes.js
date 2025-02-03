const { Router } = require("express");

const userController = require("../controllers/user-controller");

const router = Router();

router.get("/users/me", userController.getUser);
router.patch("/users/me", userController.updateUser);
router.delete("/users/me", userController.deleteUser);

module.exports = router;