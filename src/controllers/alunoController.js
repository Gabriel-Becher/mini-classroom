const Aluno = require("../models/Aluno");

exports.index = async (req, res) => {
  if (req.params.id) {
    const aluno = await Aluno.findByPk(req.params.id);
    return aluno
      ? res.json(aluno)
      : res.status(404).json({ error: "Aluno not found" });
  }
  const alunos = await Aluno.findAll();
  return alunos
    ? res.json(alunos)
    : res.status(404).json({ error: "Alunos not found" });
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
  const aluno = await Aluno.create({ name, email, password });
  return res.json(aluno);
};

exports.update = async (req, res) => {
  const aluno = await Aluno.findByPk(req.params.id);
  if (!aluno) {
    return res.status(404).json({ error: "Aluno not found" });
  }
  aluno.name = req.body.name;
  aluno.email = req.body.email;
  aluno.password = req.body.password;
  await aluno.save();
  return res.json(aluno);
};

exports.delete = async (req, res) => {
  const aluno = await Aluno.findByPk(req.params.id);
  if (!aluno) {
    return res.status(404).json({ error: "Aluno not found" });
  }
  await aluno.destroy();
  return res.json({ message: "Aluno deleted" });
};
