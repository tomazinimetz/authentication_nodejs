const database = require("../database");

const UserSchema = new database.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    select: false,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
});

const User = database.model("User", UserSchema);
module.exports = User; 
