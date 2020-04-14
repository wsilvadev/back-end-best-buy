const connection = require("../connection");
const crypto = require("crypto");

module.exports = {
  async index(req, res) {
    const login = await connection("login").select("*");
    return res.json(login);
  },
  async create(req, res) {
    const { name, email, password } = req.body;

    const id = crypto.randomBytes(8).toString("HEX");

    await connection("login").insert({
      id,
      name,
      email,
      password,
    });
    return res.json({ id });
  },
};
