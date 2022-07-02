const express = require("express");
const router = express.Router();
const { User } = require("../models/registerModels");
const bcrypt = require("bcrypt");
const Joi = require("joi");


router.post("/login", async (req, res) => {
  try {
    let { error } = validate(req.body);

    if (error) res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send({ message: "Invalid Email or Password" });
    console.log(user);

    const token = user.generateAuthToken();

    res.status(200).send({ message: "logged in successfully", token });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
