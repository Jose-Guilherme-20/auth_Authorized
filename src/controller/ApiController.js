const User = require("../model/user");
const { generateToken } = require("../config/passport");

const register = async (req, res) => {
  const { email, password } = req.body;
  if (req.body.email && req.body.password) {
    const user = await User.findOne({
      where: { email, password },
    });
    if (!user) {
      const createUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      const token = generateToken({ id: createUser.id });
      res.status(201).json({
        id: createUser.id,
        token,
        message: "Usuário criado com sucesso",
      });
    }

    res.status(404).json({ message: "O usuário já existe" });
  }
};

const login = async (req, res) => {
  if (req.body.email && req.body.password) {
    let email = req.body.email;
    let password = req.body.password;

    let user = await User.findOne({
      where: { email, password },
    });
    if (user) {
      const token = generateToken({ id: user.id });
      res.json({ status: true, token });
    }
  }
  res.json({ status: false });
};

const list = async (req, res) => {
  const emailUser = await User.findAll({
    attributes: ["email"],
  });
  const user = req.user;
  res.status(200).json({ emailUser, user });
};
module.exports = {
  register,
  login,
  list,
};
