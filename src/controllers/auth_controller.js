const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const tokenGenerator = require("../services/token_generator");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: "Invalid password" });
    }

    user.password = undefined;

    return res.send({ user, token: tokenGenerator({ id: user.id }) });
  } catch (err) {
    return res.status(400).send({ error: "Authentication error" });
  }
});

module.exports = (app) => app.use("/auth", router);
