const express = require("express"); //package
const bcrypt = require("bcryptjs"); //package
const signupSchema = require("../models/signupModel");
const {
  create,
  readAll,
  readOne,
  update,
  destroy,
  destroyMany,
} = require("../CURD operations/basicCURD");

const router = express.Router();

router.post("/post", async (req, res) => {
  try {
    // const signupData = {
    //   username: req.body.username,
    //   name: req.body.name,
    //   address: req.body.address,
    //   phone_number: req.body.phone_number,
    //   password: await bcrypt.hash(req.body.password, 10)
    // };

    //Using Deconstructuring
    const {username, name, address, phone_number, password} = req.body;
    const signupData = {
      username,
      name,
      address,
      phone_number, 
      password: await bcrypt.hash(password, 10)
    }
    console.log(password);
    const newUser = await create(signupSchema, signupData);
    console.log(newUser);
    res.status(200).json({ newUser });
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

router.get("/get", async (req, res) => {
  try {
    const getAllUsers = await readAll(signupSchema);
    res.status(200).json({ Alluser: getAllUsers });
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

router.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getUserById = await readOne(signupSchema, id);
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

router.delete("/delete/name/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const getUserByName = await destroyMany(signupSchema, name);
    res.status(400).json({ deletedusers: getUserByName });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getUserById = await destroy(signupSchema, id);
    res.status(200).json({ deleteduser: getUserById });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
