const express = require("express");
const bcrypt = require("bcryptjs");
const signupSchema = require("../models/signupModel");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/post", async (req, res) => {
  console.log("Inside Login");
  try {
    const { username, password } = req.body;
    const getUser = await signupSchema.findOne({
      username: username,
    });
    const pass = await bcrypt.compareSync(password, getUser.password);
    if(pass){
        console.log("User Found");
        const generateToken = jwt.sign({_id: getUser.id}, 'secret');
        res.status(200).json({
          msg: "Login Successful",
          token: generateToken,
        });
    } 
    else{
        console.log("Not found");
        console.log("Password is mistake"); 
    }
  } catch (err) {
    console.log("User not found", err.msg);
  }
});

module.exports = router;
