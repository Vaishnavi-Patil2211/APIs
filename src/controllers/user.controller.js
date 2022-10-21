const User = require("../models/user.model");
const sendVerificationEmail = require("../middleware/verify");

exports.registerUser = async (req, res) => {
  const { userID, mobileNo, email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const newUser = new User({
    userID,
    mobileNo,
    email,
  });

  await newUser.save();

  sendVerificationEmail(newUser);

  res.status(200).json({
    message: "User created successfully",
  });
};

exports.verifyUser = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    return res.status(400).json({
      message: "Invalid verification token",
    });
  }

  await User.updateOne({ verificationToken }, { verified: true });

  res.status(200).json({
    message: "User verified successfully",
  });
};
