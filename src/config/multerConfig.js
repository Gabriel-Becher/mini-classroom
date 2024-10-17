const multer = require("multer");
const extname = require("path").extname;
const resolve = require("path").resolve;

module.exports = {
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/jpg"
    ) {
      return cb(new multer.MulterError("Arquivo precisa ser PNG, JPEG ou JPG"));
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, "..", "..", "uploads", "images"));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        `${Date.now()}${"Aluno" + req.body.aluno_id}${extname(
          file.originalname
        )}`
      );
    },
  }),
};
