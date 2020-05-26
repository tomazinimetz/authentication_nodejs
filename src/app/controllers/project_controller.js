const express = require("express");
const jwtVerify = require("../../services/auth_service");

const router = express.Router();
router.use(jwtVerify);

router.get("/", (req, res) => {
  res.send({ OK: true });
});

module.exports = (app) => app.use("/projects", router);
