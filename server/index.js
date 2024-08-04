require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./mongodb");
const Book = require("./module/books.js");
const PORT = process.env.PORT || 8000;

const app = express();
connectDB();

// Add Middelware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//Create Route
app.get("/api/books", async (req, res) => {
  try {
    const category = req.query.category;

    filter = {};

    if (category) {
      filter.category = category;
    }

    const data = await Book.find(filter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An erro occuerd while featching the data" });
  }
});

app.get("/api/books/:slug", async (req, res) => {
  try {
    const reqParam = req.params.slug;

    const data = await Book.find({ slug: reqParam });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An erro occuerd while featching the data" });
  }
});

app.get("/", (req, res) => {
  res.json("hello world");
});

app.get("*", (req, res) => {
  res.sendStatus("404");
});

app.listen(PORT, () => {
  console.log(`Server is running on this port: ${PORT}`);
});
