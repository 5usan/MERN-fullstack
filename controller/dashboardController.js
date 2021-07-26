const express = require("express");
const mongoose = require("mongoose");

const dashboardSchema = require("../models/dashboardModel");

const url =
  "mongodb+srv://susan:537573616E@cluster0.ha8bb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const port = 4002;
const app = express();

app.use(express.json());

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    err ? console.log(err.message) : console.log("Database Connected"); //Ternary Operator
  }
);

app.listen(port, () => {
  try {
    console.log("Server is created at port: ", port);
  } catch (err) {
    console.log("Server not created: ", err.message);
  }
});

app.post("/dashboard", async (req, res) => {
  try {
    const newDashboard = new dashboardSchema(req.body);
    console.log(newDashboard);
    const isCreated = await newDashboard.save();
    res.status(200).json({ isCreated });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

app.get("/dashboard", async (req, res) => {
  try {
    const getAllDashboard = await dashboardSchema.find();
    res.status(200).json({ getAllDashboard });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

app.get("/dashboard/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getDashboardById = await dashboardSchema.findById({ _id: id });
    res.status(200).json({ requestedDashboard: getDashboardById });
  } catch (err) {
    res.status(400).json({msg: 'There was an error: '+ err.message});
   
  }
});

app.patch("/dashboard/:id", async (req, res) => {
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
            description: updatedDashboardData.description
          }
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

app.delete('/dashboard/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const getDashboardById = await dashboardSchema.findByIdAndDelete({_id: id});
        res.status(400).json({ deleteduser: getDashboardById });

    }catch(err) {
        res.status(400).json({msg: err.message});
    }
});
