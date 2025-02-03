const { Router } = require("express");

const categoryController = require("../controllers/category-controller");

const router = Router();

const isAdminUser = require("../middleware/permission-middleware");

router.get("/categories", categoryController.getAllCategories);
router.post("/categories", isAdminUser, categoryController.addNewCategory);
// router.delete("/users/me", categoryController);

module.exports = router;