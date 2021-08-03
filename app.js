const express = require("express"); //package
const mongoose = require("mongoose"); //package

//var upload = multer({ storage: storage });

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

