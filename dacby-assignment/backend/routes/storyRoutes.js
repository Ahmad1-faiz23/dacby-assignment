const express = require("express");

const {
  getStories,
  getSingleStory,
  toggleBookmark,
  getBookmarks,
} = require("../controllers/storyController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getStories);

router.get(
  "/bookmarks/all",
  authMiddleware,
  getBookmarks
);

router.get("/:id", getSingleStory);

router.post(
  "/:id/bookmark",
  authMiddleware,
  toggleBookmark
);

module.exports = router;