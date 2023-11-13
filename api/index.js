const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require("dotenv").config();
const UserRoute = require("./routes/userRoute");
const NoteRoute = require("./routes/noteRoute");
const AdminRoute = require("./routes/authRoute");

const db = mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("db connection successfull"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use(
  cors({
    origin: "*", // Replace with your allowed origin(s)
    methods: "GET,PUT,POST,DELETE",
    credentials: true, // Enable cookies and other credentials
  })
);

app.use("/api/user", UserRoute);
app.use("/api/notes", NoteRoute);
app.use("/api/auth", AdminRoute);

app.listen(process.env.ROUTE || 5500, () => {
  console.log("server is running");
});
