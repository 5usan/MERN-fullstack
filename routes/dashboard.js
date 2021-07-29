const express = require("express");
const dashboardSchema = require("../models/dashboardModel");

const router = express.Router();

router.post("/post", async (req, res) => {
  try {
    const newDashboard = new dashboardSchema(req.body);
    console.log(newDashboard);
    const isCreated = await newDashboard.save();
    res.status(200).json({ isCreated });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.get("/get", async (req, res) => {
  try {
    const getAllDashboard = await dashboardSchema.find();
    res.status(200).json({ getAllDashboard });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getDashboardById = await dashboardSchema.findById({ _id: id });
    res.status(200).json({ requestedDashboard: getDashboardById });
  } catch (err) {
    res.status(400).json({ msg: "There was an error: " + err.message });
  }
});

router.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getDashboardById = await dashboardSchema.findById({ _id: id });
    res.status(200).json({ getDashboardById });
    try {
      const updatedDashboardData = req.body;
      const updatedDashboard = await dashboardSchema.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            title: updatedDashboardData.title,
            description: updatedDashboardData.description,
          },
        }
      );
      res.status(400).json({ updatedDashboard });
    } catch (err) {
      res.status(400).json(err.message);
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getDashboardById = await dashboardSchema.findByIdAndDelete({
      _id: id,
    });
    res.status(400).json({ deleteduser: getDashboardById });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
