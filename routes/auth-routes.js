const { Router } = require("express");

const authController = require("../controllers/auth-controller");

const router = Router();

router.post("/auth/signup", authController.signup);

module.exports = router;