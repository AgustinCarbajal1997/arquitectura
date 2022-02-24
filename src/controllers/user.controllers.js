const User = require("../models/user");
const formValidation = require("../utils/signup_validation");
const token = require("./auth.controllers");
const bcrypt = require("bcrypt");
const signUp = async (req, res) => {
  try {
    const { mail, name, lastname, address, cellphone, password } = req.body;
    const dataUser = { mail, name, lastname, address, cellphone, password };
    let validation = formValidation(dataUser);

    if (validation.validationErrors) {
      let validation_info = Object.keys(validation.validationFields).reduce(
        (ac, item) => {
          return validation.validationFields[item][0]
            ? { ...ac }
            : { ...ac, [item]: validation.validationFields[item] };
        },
        {}
      );
      return res.status(400).json(validation_info);
    }
    const existUser = await User.find({ mail: dataUser.mail });
    if (existUser.length)
      return res.status(403).json({ message: "Mail already exists" });
    const newUser = new User(dataUser);
    await newUser.save();
    return res.status(201).json({
      message: "Successfully registered",
      dataUser: newUser,
      access_token: token.generateToken({ id: newUser.id }),
    });
  } catch (error) {
    res.status(500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

const login = async (req, res) => {
  try {
    const { mail, password } = req.body;
    let data = await User.findOne({ mail });
    if (!data) throw { status: 401, message: "Incorrect user or passsword" };
    const match = await bcrypt.compare(password, data.password);
    if (!match) throw { status: 401, message: "Incorrect user or passsword" };
    return res.status(200).json({
      message: "Successful login",
      dataUser: data,
      access_token: token.generateToken({ id: data.id }),
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

const getDataUser = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const data = await User.findById(userId);
    return res.status(200).json({
      dataUser: data,
    });
  } catch (error) {
    res.status(500).json({
      message: `Something have gone wrong. Unsuccessful action. ${error.message}`,
    });
  }
};

module.exports = {
  signUp,
  login,
  getDataUser,
};
