const Aluno = require("../models/Aluno");
const Foto = require("../models/Foto");
const { OP } = require("sequelize");

exports.index = async (req, res) => {
  const nome = req.query.name;
  if (!nome) {
    const alunos = await Aluno.findAll({
      include: {
        model: Foto,
        attributes: ["filename", "url"],
      },
    });
    return res.json(alunos);
  }
  const alunos = await Aluno.findAll({
    where: { name: { [OP.substring]: nome } },
    include: {
      model: Foto,
      attributes: ["filename", "url"],
    },
  });
  return alunos
    ? res.json(alunos)
    : res.status(404).json({ error: "Not found" });
};

exports.show = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "ID is required" });
  }
  const aluno = await Aluno.findByPk(req.params.id, {
    include: {
      model: Foto,
      attributes: ["filename", "url"],
    },
  });
  return aluno
    ? res.json(aluno)
    : res.status(404).json({ error: "Aluno not found" });
};

exports.store = async (req, res) => {
  const { name, turma_id } = req.body;
  if (!name || !turma_id) {
    return res
      .status(400)
      .json({ error: "Name, surname, turma_id are required" });
  }
  try {
    const aluno = await Aluno.create({ name, turma_id });
    return res.json(aluno);
  } catch (e) {
    return res.status(500).json({ error: "Aluno não criado" });
  }
};

exports.update = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "ID is required" });
  }
  if (!req.body.name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const aluno = await Aluno.findByPk(req.params.id);
  if (!aluno) {
    return res.status(404).json({ error: "Aluno not found" });
  }
  aluno.name = req.body.name;
  try {
    await aluno.save();
    return res.json(aluno);
  } catch (error) {
    return res.status(500).json({ error: "Aluno não atualizado" });
  }
};

exports.delete = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "ID is required" });
  }
  const aluno = await Aluno.findByPk(req.params.id);
  if (!aluno) {
    return res.status(404).json({ error: "Aluno not found" });
  }
  try {
    await aluno.destroy();
  } catch (error) {
    return res.status(500).json({ error: "Aluno não deletado" });
  }
  return res.json({ message: "Aluno deleted" });
};
