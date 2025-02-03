const { Router } = require("express");

const categoryController = require("../controllers/category-controller");

const router = Router();

const isAdminUser = require("../middleware/permission-middleware");

router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getCategoryById);
router.post("/categories", isAdminUser, categoryController.addNewCategory);
router.patch("/categories/:id", isAdminUser, categoryController.updateCategory);

// TODO: optional => delete category

module.exports = router;