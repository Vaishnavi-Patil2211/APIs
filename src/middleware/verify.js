const nodemailer = require("nodemailer");

const { v4: uuidv4 } = require("uuid");

const createVerificationToken = async (user) => {
  const verificationToken = uuidv4();

  await User.updateOne({ _id: user._id }, { verificationToken });

  return verificationToken;
};

const sendVerificationEmail = async (user) => {
  const verificationToken = await createVerificationToken(user);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: user.email,
    subject: "Verify your email",
    html: `<h1>confirm your email address to get started with slack</h1>
        <p>once you have confirmed that ${user.email} is your email address, you can start using slack</p>
        <a href="http://localhost:3000/verify/${verificationToken}">Confirm Email Address</a>`,
  });
};

module.exports = sendVerificationEmail;
