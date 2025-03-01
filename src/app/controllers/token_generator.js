const jwt = require("jsonwebtoken");
const auth_config = require("../../config/auth_config.json");

module.exports = (params = {}) => {
  return jwt.sign(params, auth_config.secret, {
    expiresIn: 86400,
  });
};
