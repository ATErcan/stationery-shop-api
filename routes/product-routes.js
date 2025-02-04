const { Router } = require("express");

const productController = require("../controllers/product-controller");

const router = Router();

const isAdminUser = require("../middleware/permission-middleware");

router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.post("/products", isAdminUser, productController.addNewProduct);
// router.patch("/categories/:id", isAdminUser, categoryController.updateCategory);

module.exports = router;
