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

exports.store = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required" });
  }
  const aviso = await Aviso.create({ title, description });
  return res.json(aviso);
};

exports.update = async (req, res) => {
  const aviso = await Aviso.findByPk(req.params.id);
  if (!aviso) {
    return res.status(404).json({ error: "Aviso not found" });
  }
  aviso.title = req.body.title;
  aviso.description = req.body.description;
  await aviso.save();
  return res.json(aviso);
};

exports.delete = async (req, res) => {
  const aviso = await Aviso.findByPk(req.params.id);
  if (!aviso) {
    return res.status(404).json({ error: "Aviso not found" });
  }
  await aviso.destroy();
  return res.json({ message: "Aviso deleted" });
};
