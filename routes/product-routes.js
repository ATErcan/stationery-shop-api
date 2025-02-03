const { Router } = require("express");

const productController = require("../controllers/product-controller");

const router = Router();

const isAdminUser = require("../middleware/permission-middleware");

router.get("/products", productController.getProducts);
// router.get("/categories/:id", categoryController.getCategoryById);
// router.post("/categories", isAdminUser, categoryController.addNewCategory);
// router.patch("/categories/:id", isAdminUser, categoryController.updateCategory);

module.exports = router;
