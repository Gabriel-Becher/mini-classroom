const Turma = require("../models/Turma");

exports.index = async (req, res) => {
  if (req.params.id) {
    const turma = await Turma.findByPk(req.params.id);
    return turma
      ? res.json(turma)
      : res.status(404).json({ error: "Turma not found" });
  }
  const turmas = await Turma.findAll();
  return turmas
    ? res.json(turmas)
    : res.status(404).json({ error: "Turmas not found" });
};

exports.store = async (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const turma = await Turma.create({ name });
  return res.json(turma);
};

exports.update = async (req, res) => {
  const turma = await Turma.findByPk(req.params.id);
  if (!turma) {
    return res.status(404).json({ error: "Turma not found" });
  }
  turma.name = req.body.name;
  await turma.save();
  return res.json(turma);
};

exports.delete = async (req, res) => {
  const turma = await Turma.findByPk(req.params.id);
  if (!turma) {
    return res.status(404).json({ error: "Turma not found" });
  }
  await turma.destroy();
  return res.json({ message: "Turma deleted" });
};
