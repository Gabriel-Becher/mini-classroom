const Aluno = require("../models/Aluno");
const Foto = require("../models/Foto");

exports.index = async (req, res) => {
  if (req.params.id) {
    const aluno = await Aluno.findByPk(req.params.id, {
      include: {
        model: Foto,
        as: "foto",
        attributes: ["filename", "url"],
      },
    });
    return aluno
      ? res.json(aluno)
      : res.status(404).json({ error: "Aluno not found" });
  }
  const alunos = await Aluno.findAll();
  return res.json(alunos);
};

exports.store = async (req, res) => {
  const { name, turma_id } = req.body;
  if (!name || !turma_id) {
    return res
      .status(400)
      .json({ error: "Name, surname, turma_id are required" });
  }
  const aluno = await Aluno.create({ name, turma_id });
  return res.json(aluno);
};

exports.update = async (req, res) => {
  const aluno = await Aluno.findByPk(req.params.id);
  if (!aluno) {
    return res.status(404).json({ error: "Aluno not found" });
  }
  aluno.name = req.body.name;
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
