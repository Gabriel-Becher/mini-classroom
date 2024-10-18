const Aviso = require("../models/Aviso");

exports.index = async (req, res) => {
  if (req.params.id) {
    const aviso = await Aviso.findByPk(req.params.id);
    return aviso
      ? res.json(aviso)
      : res.status(404).json({ error: "Aviso not found" });
  }
  const avisos = await Aviso.findAll();
  return avisos
    ? res.json(avisos)
    : res.status(404).json({ error: "Avisos not found" });
};

exports.show = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "Aviso_id is required" });
  }
  const aviso = await Aviso.findByPk(req.params.id);
  return aviso
    ? res.json(aviso)
    : res.status(404).json({ error: "Aviso not found" });
};

exports.store = async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const turma_id = req.body.turma_id;
  if (!turma_id) {
    return res.status(400).json({ error: "Turma_id is required" });
  }
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  try {
    const aviso = await Aviso.create({ turma_id, title, content });
    return res.json(aviso);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "Aviso_id is required" });
  }
  const aviso = await Aviso.findByPk(req.params.id);
  if (!aviso) {
    return res.status(404).json({ error: "Aviso not found" });
  }
  if (!req.body.title && !req.body.content) {
    return res.status(400).json({ error: "Title or description are required" });
  }
  if (req.body.title) {
    aviso.title = req.body.title;
  }
  if (req.body.content) {
    aviso.content = req.body.content;
  }
  try {
    await aviso.save();
    return res.json(aviso);
  } catch (e) {
    return res.status(500).json({ error: "Aviso not updated" });
  }
};

exports.delete = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "Aviso_id is required" });
  }
  const aviso = await Aviso.findByPk(req.params.id);
  if (!aviso) {
    return res.status(404).json({ error: "Aviso not found" });
  }
  try {
    await aviso.destroy();
    return res.json({ message: "Aviso deleted" });
  } catch (e) {
    return res.status(500).json({ error: "Aviso not deleted" });
  }
};
