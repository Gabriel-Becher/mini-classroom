const Sequelize = require("sequelize");

class Aviso extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "O campo título não pode ser vazio",
            },
          },
        },
        content: {
          type: Sequelize.TEXT,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "O campo conteúdo não pode ser vazio",
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
    this.belongsTo(models.Turma, { foreignKey: "turma_id" });
  }
}

module.exports = Aviso;
