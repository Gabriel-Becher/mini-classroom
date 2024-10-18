const Turma = require("../models/Turma");
const Aluno = require("../models/Aluno");
const Foto = require("../models/Foto");
const Professor = require("../models/Professor");
const Aviso = require("../models/Aviso");

exports.index = async (req, res) => {
  const turmas = await Turma.findAll();
  return res.json(turmas);
};

exports.show = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "Turma_id is required" });
  }
  const turma = await Turma.findByPk(req.params.id, {
    include: [
      {
        model: Aluno,
        attributes: ["id", "name"],
        include: {
          model: Foto,
          attributes: ["id", "filename", "url"],
        },
      },
      {
        model: Professor,
        attributes: ["id", "name"],
      },
      {
        model: Aviso,
        attributes: ["id", "title", "content"],
      },
    ],
  });
  return turma
    ? res.json(turma)
    : res.status(404).json({ error: "Turma not found" });
};

exports.store = async (req, res) => {
  const { name, description } = req.body;
  const errors = [];
  if (!name) {
    errors.push("name is required");
  }
  if (!description) {
    errors.push("description is required");
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  try {
    const turma = await Turma.create({ name, description });
    return res.json(turma);
  } catch (e) {
    return res.status(500).json({ error: "Turma not created" });
  }
};

exports.update = async (req, res) => {
  const turma = await Turma.findByPk(req.params.id);
  if (!turma) {
    return res.status(404).json({ error: "Turma not found" });
  }
  turma.descriptopm = req.body.description;
  try {
    await turma.save();
    return res.json(turma);
  } catch (e) {
    return res.status(500).json({ error: "Turma not updated" });
  }
};

exports.delete = async (req, res) => {
  const turma = await Turma.findByPk(req.params.id);
  if (!turma) {
    return res.status(404).json({ error: "Turma not found" });
  }
  try {
    await turma.destroy();
    return res.json({ message: "Turma deleted" });
  } catch (e) {
    return res.status(500).json({ error: "Turma not deleted" });
  }
};
