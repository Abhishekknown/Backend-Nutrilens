const express = require("express");
const mongoose = require("mongoose");
const History = require("../models/History"); // Assuming your model file is in a 'models' directory
const router = express.Router();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

//API endpoint to fetch history
router.get("/history", async (req, res) => {
  try {
    const userId = req["x-userId"]
    console.log(userId)
    const historyData = await History.find({ "userId": userId })
    res.status(200).json({ historyData })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" })
  }
});

// API endpoint to save or update history
router.post("/history", async (req, res) => {
  try {
    const { history } = req.body;
    const userId = req["x-userId"];
    // Check if history exists for the user
    const existingHistory = await History.findOne({ userId });

    if (existingHistory) {
      // Append new history to existing document
      existingHistory.history.push(...history);
      const updatedHistory = await existingHistory.save();
      res.status(200).json(updatedHistory);
    } else {
      // Create a new history document
      const newHistory = new History({
        userId,
        history,
      });
      const savedHistory = await newHistory.save();
      res.status(201).json(savedHistory);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;