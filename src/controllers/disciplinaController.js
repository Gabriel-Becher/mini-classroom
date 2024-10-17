const Disciplina = require("../models/Disciplina");

exports.index = async (req, res) => {
  if (req.params.id) {
    const disciplina = await Disciplina.findByPk(req.params.id);
    return disciplina
      ? res.json(disciplina)
      : res.status(404).json({ error: "Disciplina not found" });
  }
  const disciplinas = await Disciplina.findAll();
  return disciplinas
    ? res.json(disciplinas)
    : res.status(404).json({ error: "Disciplinas not found" });
};

exports.store = async (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const disciplina = await Disciplina.create({ name });
  return res.json(disciplina);
};

exports.update = async (req, res) => {
  const disciplina = await Disciplina.findByPk(req.params.id);
  if (!disciplina) {
    return res.status(404).json({ error: "Disciplina not found" });
  }
  disciplina.name = req.body.name;
  await disciplina.save();
  return res.json(disciplina);
};

exports.delete = async (req, res) => {
  const disciplina = await Disciplina.findByPk(req.params.id);
  if (!disciplina) {
    return res.status(404).json({ error: "Disciplina not found" });
  }
  await disciplina.destroy();
  return res.json({ message: "Disciplina deleted" });
};
