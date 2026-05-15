const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const scrapeStories =
  require("./services/scraper");

const authRoutes =
  require("./routes/authRoutes");

const storyRoutes =
  require("./routes/storyRoutes");

dotenv.config();

const app = express();


// ✅ CORS

app.use(cors({
  origin: "*",
}));


// ✅ Middleware

app.use(express.json());


// ✅ Routes

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/stories",
  storyRoutes
);


// ✅ Default Route

app.get("/", (req, res) => {

  res.send("API Running");

});


// ✅ MongoDB + Server

const PORT =
  process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)

  .then(async () => {

    console.log("MongoDB Connected");

    // scraper run after DB connect
    await scrapeStories();

    app.listen(PORT, () => {

      console.log(
        `Server running on ${PORT}`
      );

    });

  })

  .catch((err) => {

    console.log(err);

  });