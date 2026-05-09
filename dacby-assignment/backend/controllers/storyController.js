const Story = require("../models/Story");

const getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({
      points: -1,
    });

    res.json(stories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSingleStory = async (
  req,
  res
) => {
  try {
    const story = await Story.findById(
      req.params.id
    );

    res.json(story);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const toggleBookmark = async (
  req,
  res
) => {
  try {
    const story = await Story.findById(
      req.params.id
    );

    const userId = req.user.id;

    const alreadyBookmarked =
      story.bookmarkedBy.includes(
        userId
      );

    if (alreadyBookmarked) {
      story.bookmarkedBy =
        story.bookmarkedBy.filter(
          (id) =>
            id.toString() !== userId
        );
    } else {
      story.bookmarkedBy.push(
        userId
      );
    }

    await story.save();

    res.json({
      message: alreadyBookmarked
        ? "Bookmark removed"
        : "Bookmark added",
      story,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBookmarks = async (
  req,
  res
) => {
  try {
    const userId = req.user.id;

    const stories = await Story.find({
      bookmarkedBy: userId,
    });

    res.json(stories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getStories,
  getSingleStory,
  toggleBookmark,
  getBookmarks,
};