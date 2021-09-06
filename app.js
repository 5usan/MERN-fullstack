const express = require("express"); //package
const mongoose = require("mongoose"); //package
const {dateConvertor1} = require("date_convertor");
const date = dateConvertor1();
const cors = require('cors');

console.log(date, "Date");

const signup = require('./routes/signup');
const dashboard = require('./routes/dashboard');
const login = require('./routes/login');



const url =
  "mongodb+srv://susan:537573616E@cluster0.ha8bb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const port = 4002;
const app = express();

app.use(express.json());
app.use(cors());

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

app.use('/login', login);

