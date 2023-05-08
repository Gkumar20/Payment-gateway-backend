const express = require('express');
const app = express();
const cors = require('cors');
const {config} = require('dotenv')
config({path:"./config/config.env"})
const payRouter = require("./routes/payRouter.js")
const mongoose = require("mongoose");



mongoose
.connect(`mongodb://0.0.0.0:27017`)
.then(() => {
  console.log(`Connected to MongoDB database`);
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api",payRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
