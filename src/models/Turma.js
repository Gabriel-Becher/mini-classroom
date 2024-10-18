const Sequelize = require("sequelize");

class Turma extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "O campo nome não pode ser vazio",
            },
          },
        },
        description: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "O campo descrição não pode ser vazio",
            },
          },
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Aviso, { foreignKey: "turma_id" });
    this.hasMany(models.Aluno, { foreignKey: "turma_id" });
    this.hasOne(models.Professor, { foreignKey: "turma_id" });
  }
}

module.exports = Turma;
