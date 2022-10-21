const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/default");

const UserSchema = new mongoose.Schema({
  userID: { type: String, unique: true },
  mobileNo: { type: String, unique: true },
  email: { type: String, unique: true },
});

UserSchema.pre("save", async function (next) {
  try {
    const saltWorkFactor = config.saltWorkFactor;

    const salt = await bcrypt.genSalt(saltWorkFactor);

    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
