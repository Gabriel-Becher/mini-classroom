const Professor = require("../models/Professor");

exports.index = async (req, res) => {
  if (req.params.id) {
    const professor = await Professor.findByPk(req.params.id);
    return professor
      ? res.json(professor)
      : res.status(404).json({ error: "Professor not found" });
  }
  const professores = await Professor.findAll();
  return professores
    ? res.json(professores)
    : res.status(404).json({ error: "Professores not found" });
};

exports.store = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email and password are required" });
  }
  const professor = await Professor.create({ name, email, password });
  return res.json(professor);
};

exports.update = async (req, res) => {
  const professor = await Professor.findByPk(req.params.id);
  if (!professor) {
    return res.status(404).json({ error: "Professor not found" });
  }
  professor.name = req.body.name;
  professor.email = req.body.email;
  professor.password = req.body.password;
  await professor.save();
  return res.json(professor);
};

exports.delete = async (req, res) => {
  const professor = await Professor.findByPk(req.params.id);
  if (!professor) {
    return res.status(404).json({ error: "Professor not found" });
  }
  await professor.destroy();
  return res.json({ message: "Professor" + professor.name + "deleted" });
};
