const express = require("express"); //package
const mongoose = require("mongoose"); //package
const multer = require('multer'); //package

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images')  //null means bug free
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname) //filename is set according to date
  }
});

var upload = multer({ storage: storage });

const signup = require('./routes/signup');
const dashboard = require('./routes/dashboard');


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

app.use('/signup', signup);

app.use('/dashboard', dashboard);

app.post('/demo', upload.single('image'), (req, res) => {
  console.log(req.body);
});
