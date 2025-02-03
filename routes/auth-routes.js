const { Router } = require("express");

const router = Router();

router.get("/auth/signup", async(req, res) => res.send("Sign Up"));

module.exports = router;