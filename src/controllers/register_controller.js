const express = require("express");
const User = require("../models/user");
const tokenGenerator = require("../services/token_generator");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "Email already in use" });
    }
    const user = await User.create(req.body);
    user.password = undefined;
    return res.send({ user, token: tokenGenerator({ id: user.id }) });
  } catch (err) {
    return res.status(400).send({ error: "Failed register" });
  }
});

module.exports = (app) => app.use("/auth", router);
