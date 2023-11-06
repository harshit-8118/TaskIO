const router = require("express").Router();
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const verify = require("../verifyToken");
const User = require("../models/user");
const Notes = require("../models/notes");

/*
url =  /api/auth/*
*/
// admin-register by admin only
router.post('/register', verify, async (req, res) => {
    if(req.user.isAdmin){
        const newUser = new User({
          ...req.body,
          password: cryptoJS.AES.encrypt(
            req.body.password,
            req.body.password
          ).toString(),
        });
        try {
          const user = await newUser.save();
          res.status(201).json(user);
        } catch (err) {
          res.status(501).json(err);
        }
    }else {
        res.status(401).json("unauthorised...");
    }
})

// get-user by admin only
router.get("/user/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const user = await User.findById(req.params.id);
      res.status(201).json(user);
    } catch (err) {
      res.status(501).json(err);
    }
  } else {
    res.status(401).json("unauthorised...");
  }
});

// get-user list by admin only
router.get("/users", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const users = await User.find().sort({createdAt: -1}).limit(50);
      // console.log(users)
      res.status(201).json(users);
    } catch (err) {
      res.status(501).json(err);
    }
  } else {
    res.status(401).json("unauthorised...");
  }
});

// delete-user by own or admin
router.delete("/:id", verify, async (req, res) => {
  if (req.params.id == req.user.id || req.user.isAdmin) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      const deletedNotes = await Notes.deleteMany({admin_id: req.params.id});
      res.status(201).json({deletedUser, deletedNotes});
    } catch (err) {
      res.status(501).json(err);
    }
  } else {
    res.status(403).json("unauthorised...");
  }
});

// update-user with own or by admin
router.put("/:id", verify, async (req, res) => {
  if (req.params.id == req.user.id || req.user.isAdmin) {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }
    req.body = {...req.body, isAdmin: req.user.isAdmin?req.body.isAdmin:false}

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("unauthorised...");
  }
});

module.exports = router;
