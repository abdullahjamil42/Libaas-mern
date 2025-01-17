const express = require("express");
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");
const { protect } = require("../middleware/authMiddleware.js"); // Middleware for route protection

const router = express.Router();

// Route to add product to wishlist
router.post("/add", addToWishlist);

// Route to fetch wishlist for a specific user
router.get("/:userId", getWishlist);

// Route to remove a product from wishlist
router.post("/remove",  removeFromWishlist);

module.exports = router;
