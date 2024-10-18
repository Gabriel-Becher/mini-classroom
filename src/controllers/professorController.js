const Professor = require("../models/Professor");

exports.index = async (req, res) => {
  const professores = await Professor.findAll();
  return professores
    ? res.json(professores)
    : res.status(404).json({ error: "Professores not found" });
};

exports.show = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "Professor_id is required" });
  }
  const professor = await Professor.findByPk(req.params.id);
  return professor
    ? res.json(professor)
    : res.status(404).json({ error: "Professor not found" });
};

exports.store = async (req, res) => {
  const name = req.body.name;
  const turma_id = req.body.turma_id;
  if (!turma_id) {
    return res.status(400).json({ error: "Turma_id is required" });
  }
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  try {
    const professor = await Professor.create({ turma_id, name });
    return res.json(professor);
  } catch (e) {
    return res.status(500).json({ error: "Professor not created" });
  }
};

exports.update = async (req, res) => {
  const professor = await Professor.findByPk(req.params.id);
  if (!professor) {
    return res.status(404).json({ error: "Professor not found" });
  }
  professor.name = req.body.name;
  try {
    return res.json(professor);
    await professor.save();
  } catch (e) {
    return res.status(500).json({ error: "Professor not updated" });
  }
};

exports.delete = async (req, res) => {
  const professor = await Professor.findByPk(req.params.id);
  if (!professor) {
    return res.status(404).json({ error: "Professor not found" });
  }
  try {
    await professor.destroy();
    return res.json({ message: "Professor" + professor.name + "deleted" });
  } catch (e) {
    return res.status(500).json({ error: "Professor not deleted" });
  }
};
