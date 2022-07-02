const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { User } = require("../models/registerModels");

router.get("/profile",  async(req, res) => {
    try {
        const user = await User.find({}, {firstname: 1, lastname: 1, email: 1})
        res.send(user)
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router