const express = require("express");
const signupSchema = require("../models/signupModel");

const router = express.Router();

router.post("/post", async (req, res) => {
    try {
      const newUser = new signupSchema(req.body);
      console.log(newUser);
      const isCreated = await newUser.save();
      if (isCreated) {
        res.status(200).json({ User: isCreated });
      } else {
        res.status(400).json({ msg: "New user is not created" });
      }
    } catch (err) {
      res.status(400).json({ msg: "Something went wrong" });
    }
  });

router.get("/get", async (req, res) => {
  try {
    const getAllUsers = await signupSchema.find();
    res.status(200).json({ Alluser: getAllUsers });
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

router.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getUserById = await signupSchema.findById({ _id: id });
    res.status(200).json({ requestedUser: getUserById });
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong " });
  }
});

router.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getUserById = await signupSchema.findById({ _id: id });
    res.status(200).json({ requestedUser: getUserById });
    try {
      const updatedUserData = req.body;
      const updatedUser = await signupSchema.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            username: updatedUserData.username,
            name: updatedUserData.name,
            address: updatedUserData.address,
            phone_number: updatedUserData.phone_number,
            password: updatedUserData.password,
          },
        }
      );
      res.status(400).json({ updatedUser });
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong " });
  }
});

router.delete("/delete/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const getUserByName = await signupSchema.deleteMany({ name: name });
    res.status(400).json({ deletedusers: getUserByName });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const getUserById = await signupSchema.findByIdAndDelete({_id: id});
        res.status(400).json({ deleteduser: getUserById });

    }catch(err) {
        res.status(400).json({msg: err.message});
    }
});

module.exports = router;
