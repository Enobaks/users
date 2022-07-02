const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/registerModels");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    let { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, saltPassword);
    let registerUser = await User.findOne({ email: req.body.email });
    if (registerUser) return res.status(400).send("User already exists");

    registerUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: securePassword,
    });

    await registerUser.save();
    res.status(200).json({ message: "Registration Successful" });
    return;
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
});

module.exports = router;
