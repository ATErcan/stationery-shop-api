const { Router } = require("express");

const authController = require("../controllers/auth-controller");

const router = Router();

router.post("/auth/signup", authController.signup);
router.post("/auth/login", authController.login);

module.exports = router;