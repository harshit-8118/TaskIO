const router = require("express").Router();
const User = require("../models/user");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const newUser = new User({
    ...req.body,
    isAdmin: false,
    password: cryptoJS.AES.encrypt(
      req.body.password,
      req.body.password
    ).toString(),
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  }catch (err) {
    res.status(501).json(err);
  }
});

router.post("/login", async (req, res) => {
  const filter = [
    { username: req.body.username },
    { email: req.body.username },
  ];
  try {
    const user = await User.findOne({ $or: filter });
    if (!user) {
      res.status(401).json("username doesn't exists.");
      return;
    }
    const originalPassword = cryptoJS.AES.decrypt(
      user.password,
      req.body.password
    ).toString(cryptoJS.enc.Utf8);
    if (originalPassword != req.body.password) {
      res.status(401).json("invalid password");
      return;
    }

    const accesstoken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );
    const { password, createdAt, updatedAt, __v, ...info } = user._doc;
    res.status(200).json({ ...info, accesstoken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
