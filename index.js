const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
// set up express

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // limit each IP to 100 requests per windowMs
// });

// app.use(limiter);

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);
const PORT = process.env.PORT || 7000;

const app = express();
app.use(express.json());
app.use(cors());
// app.use(express.static("client/build"))

const root = require('path').join(__dirname, 'client', 'build')
app.use(express.static(root));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
      res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
      return res.status(200).json({});
  }
  next();
});

// set up routes
app.use("/api/products", require("./routes/productRouter"));
app.use("/api/users", require("./routes/userRouter"));
app.use("/api/hookspublisher/", require("./routes/hooksRouter"));

app.get("*", function (req, res) {
  res.sendFile('index.html', { root });
})

app.use(helmet());

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));




