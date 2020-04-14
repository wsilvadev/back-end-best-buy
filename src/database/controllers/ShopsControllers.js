const connection = require("../connection");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection("shops").count();

    const shops = await connection("shops")
      .limit(8)
      .offset((page - 1) * 8)
      .select("*");

    res.header("Total-Count", count["count(*)"]);

    return res.json(shops);
  },
  async create(req, res) {
    const { name, description, image, value } = req.body;
    const user_id = req.headers.authorization;

    const [id] = await connection("shops").insert({
      name,
      description,
      image,
      value,
      user_id,
    });
    return res.json({ id });
  },
  async delete(req, res) {
    const { id } = req.params;
    const user_id = req.headers.authorization;

    const shops = await connection("shops")
      .where("id", id)
      .select("user_id")
      .first();
    if (shops.user_id !== user_id) {
      return res.status(401).json({ error: "Operation not permitred" });
    }
    await connection("shops").where("id", id).delete();
    return res.status(204).send();
  },
};
