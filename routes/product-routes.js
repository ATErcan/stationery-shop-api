const { Router } = require("express");

const productController = require("../controllers/product-controller");

const router = Router();

const isAdminUser = require("../middleware/permission-middleware");

router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.post("/products", isAdminUser, productController.addNewProduct);
router.put("/products/:id", isAdminUser, productController.updateProduct);
router.delete("/products/:id", isAdminUser, productController.deleteProduct);

module.exports = router;
