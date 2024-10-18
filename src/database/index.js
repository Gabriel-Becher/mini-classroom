const Sequelize = require("sequelize");
const databaseConfig = require("../config/database");
const Professor = require("../models/Professor");
const Turma = require("../models/Turma");
const Aviso = require("../models/Aviso");
const Foto = require("../models/Foto");
const Aluno = require("../models/Aluno");

const models = [Professor, Turma, Aviso, Foto, Aluno];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => {
  model.associate && model.associate(connection.models);
});
