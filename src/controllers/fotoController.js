const multer = require("multer");
const multerConfig = require("../config/multerConfig");
const path = require("path");
const fs = require("fs");
const Foto = require("../models/Foto");
const Aluno = require("../models/Aluno");

const upload = multer(multerConfig).single("picture");
const filepath = path.resolve(__dirname, "..", "..", "uploads", "images");

exports.store = (req, res) => {
  return upload(req, res, async (err) => {
    if (err) {
      fs.rmSync(filepath + "/" + req.file.filename);
      return res.status(400).json({
        errors: [err.code],
      });
    }
    try {
      const { originalname, filename } = req.file;
      console.log(originalname, filename);
      const { aluno_id } = req.body;
      const foto = await Foto.create({
        original_name: originalname,
        filename,
        aluno_id,
      });
      return res.json(foto);
    } catch (e) {
      fs.rmSync(filepath + "/" + req.file.filename);
      return res.status(400).json({
        errors: [e.message],
      });
    }
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  Aluno.findByPk(id, {
    include: { model: Foto, as: "fotos", fileds: ["filename"] },
  })
    .then((aluno) => {
      if (!aluno) {
        return res.status(400).json({
          errors: ["Aluno não existe"],
        });
      }
      const fotos = aluno.fotos.map((foto) => foto.filename);
      fotos.map((foto) => {
        Foto.destroy({ where: { filename: foto } });
      });
      return res.json(aluno);
    })
    .catch((e) => {
      return res.status(400).json({
        errors: ["Erro ao deletar foto"],
      });
    });
};
