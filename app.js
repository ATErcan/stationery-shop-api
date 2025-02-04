require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");
const categoryRoutes = require("./routes/category-routes");
const productRoutes = require("./routes/product-routes");
const handleErrors = require("./middleware/errors-middleware");
const verifyUser = require("./middleware/auth-middleware");

const app = express();

// middleware
app.use(express.json());
app.use("/api", router);

async function main() {
  const dbURI = process.env.DB_URI;

  if (!dbURI) {
    console.error(
      "Database URI is missing. Please set DB_URI in your .env file."
    );
    process.exit(1);
  }

  await mongoose.connect(dbURI);
  app.listen(8080);
}

try {
  main();
} catch (error) {
  console.log(error);
}

router.get("/", (req, res) => res.send("home"));
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", verifyUser, userRoutes);
app.use(handleErrors);