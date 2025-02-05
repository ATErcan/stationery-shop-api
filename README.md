
# 📦 Stationery Shop API

The Stationery Shop API is the backend service for the Stationery Shop e-commerce platform. It provides authentication, user management, product listings, cart operations, and checkout functionality using a RESTful API.


## Features

- 👤 Authentication & User Management
  - ✅ User Sign-up & Login (JWT-based authentication)
  - ✅ Profile Management – Users can update their profile data
- 🛍️ Product Management
  - ✅ CRUD Operations for Products – List, create, update, and delete products
  - ✅ Category-based Filtering & Search
- 🛒 Shopping Cart & Checkout
  - ✅ Add to Cart – Authenticated users can add products to their cart
  - ✅ Modify Cart – Update quantity or remove items
  - ✅ Checkout – Finalize orders and clear cart
  


## Authors

- [@ATErcan](https://www.github.com/ATErcan)
All codes in this project are written by me.


## 🛠️ Tech Stack

🖥 Node.js & Express.js – Backend framework for handling REST API requests

🛢 MongoDB & Mongoose – NoSQL database for storing users, products, and carts

🔐 JSON Web Tokens (JWT) – Secure authentication and authorization

🔄 Argon2 – Secure password hashing

📜 Validator.js – Input validation

🌍 CORS – Cross-Origin Resource Sharing support

🔑 Dotenv – Environment variable management


## Installation
Clone the project, and install the dependencies
```bash
  $ git clone https://github.com/ATErcan/stationery-shop-api

  $ npm install
```
Create a .env file by following the Environment Variables section. Run the development server with the command below
```bash
  $ nodemon app
```
Create requests on Postman or any other similar tool
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Create a cluster in MongoDB, then create a database and connect your app to your database

`DB_URI`

Generate a JWT_SECRET variable

`JWT_SECRET`

Decide on the time that jwt token will expire

`JWT_MAX_AGE`










## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ahmet-talha-ercan/)

