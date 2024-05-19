const User = require("../models/User");
authservice = require("../service/AuthService");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!validateEmail(email)) {
      res.status(400).send({ message: "invalid email" });
    } else {
      const user = new User({ name, email, password });
      await user.save();
      res.status(201).send({ user, message: "User created successfully" });
    }
  } catch (err) {
    err.code == "11000"
      ? res.status(400).send("email account already exists")
      : res.status(500).send(`Internal Server error`);
  }
};

const ValidateUser = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(`error in validating user` + err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send({ user, message: "User not found" });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      res.status(404).send({ user, message: "invalid password" });
    }
    token = await authservice.generatetoken(user._id, user.email);
    res
      .status(200)
      .send({ user, token, message: "User logged in successfully" });
  } catch (err) {
    console.log(`error in creating user` + err);
  }
};

const validateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};
module.exports = { register, login, ValidateUser };
