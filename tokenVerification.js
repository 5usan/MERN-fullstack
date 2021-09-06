const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({ msg: "Access Denied" });
  }
  try {
    const verify = jwt.verify(token, "secret");
    console.log(verify);
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
};


module.exports = verifyToken;
