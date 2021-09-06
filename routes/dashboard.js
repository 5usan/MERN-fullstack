const express = require("express");
const dashboardSchema = require("../models/dashboardModel");
const {
  create,
  readAll,
  readOne,
  update,
  destroy
} = require("../CURD operations/basicCURD");
const {upload} = require('../Utilities/uploadFiles');

const router = express.Router();

router.post("/post", upload.single('image'), async (req, res) =>{ 
  //Using Deconstructuring
  const {title, description, user, image} = req.body;
  const dasdboardData = {
    title, 
    description,
    user,
    image: req.file.path
  }
  try {
    const newDashboard = await create(dashboardSchema, dasdboardData);
    console.log(newDashboard);
    res.status(200).json({ newDashboard });
  } catch (err) {
    res.status(400).json("Error: ", err.message);
  }
});

router.get("/get", async (req, res) => {
  try {
    const getAllDashboard = await readAll(dashboardSchema);
    res.status(200).json({ getAllDashboard });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getDashboardById = await readOne(dashboardSchema, id);
    res.status(200).json({ requestedDashboard: getDashboardById });
  } catch (err) {
    res.status(400).json({ msg: "There was an error: " + err.message });
  }
});

// router.patch("/update/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const getDashboardById = await readOne(dashboardSchema, id);
//     res.status(200).json({ getDashboardById });
//     try {
//       const updatedDashboardData = req.body;
//       console.log(updatedDashboardData);
//       const updatedDashboard = await dashboardSchema.findByIdAndUpdate(
//         { _id: id },
//         {
//           $set: {
//             title: updatedDashboardData.title,
//             description: updatedDashboardData.description,
//           },
//         }
//       );
//       res.status(400).json({ updatedDashboard });
//     } catch (err) {
//       res.status(400).json(err.message);
//     }
//   } catch (err) {
//     res.status(400).json(err.message);
//   }
// });

router.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const { title, description } = req.body;
    const updatedDashboardData = {
      title: title,
      description: description,
    };
    console.log(updatedDashboardData);
    const updatedDashboard = await update(
      dashboardSchema,
      id,
      updatedDashboardData
    );
    console.log(updatedDashboard);
    if (updatedDashboard) {
      res.status(200).json(updatedDashboard);
    } else {
      res.status(400).json({ msg: "Update not successful" });
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getDashboardById = await destroy(dashboardSchema, id);
    res.status(200).json({ deleteduser: getDashboardById });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
})

module.exports = router;
