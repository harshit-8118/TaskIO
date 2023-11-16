const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const UserRoute = require("./routes/userRoute");
const NoteRoute = require("./routes/noteRoute");
const AdminRoute = require("./routes/authRoute");
const commentRoute = require("./routes/commentsRoute");

const db = mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("db connection successfull"))
  .catch((err) => console.log(err));

app.use(express.json());
const allowedOrigins = [
  "https://mr-task8.netlify.app",
  // "http://localhost:3000",
];
app.use(
  cors({
    origin: allowedOrigins, 
    methods: "GET,PUT,POST,DELETE",
    credentials: true, 
  })
);

app.use("/api/user", UserRoute);
app.use("/api/notes", NoteRoute);
app.use("/api/auth", AdminRoute);
app.use("/api/message", commentRoute);

app.listen(process.env.ROUTE || 8000, () => {
  console.log("server is running");
});
