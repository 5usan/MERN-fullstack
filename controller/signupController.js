const express = require("express");
const mongoose = require("mongoose");

const port = 4002;
const url =
  "mongodb+srv://susan:537573616E@cluster0.ha8bb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const signupSchema = require("../models/signupModel");

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
    if (err) {
      console.log("There is an error and the error message is:", err.message);
    } else {
      console.log("Database connected");
    }
  }
);

app.listen(port, () => {
  try {
    console.log("Server is connected at port:", port);
  } catch (err) {
    console.log("Server not connected:", err.message);
  }
});

app.post("/signup", async (req, res) => {
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

app.get("/signup", async (req, res) => {
  try {
    const getAllUsers = await signupSchema.find();
    res.status(200).json({ Alluser: getAllUsers });
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

app.get("/signup/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getUserById = await signupSchema.findById({ _id: id });
    res.status(200).json({ requestedUser: getUserById });
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong " });
  }
});

app.patch("/signup/:id", async (req, res) => {
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
            password: updatedUserData.password
          }
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

app.delete('/signup/:name', async (req, res) => {
    const name = req.params.name;
    try{
        const getUserByName = await signupSchema.deleteMany({name: name});
        res.status(400).json({ deletedusers: getUserByName });

    }catch(err) {
        res.status(400).json({msg: err.message});
    }
});

app.delete('/signup/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const getUserById = await signupSchema.findByIdAndDelete({_id: id});
        res.status(400).json({ deleteduser: getUserById });

    }catch(err) {
        res.status(400).json({msg: err.message});
    }
});
