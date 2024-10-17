const Sequelize = require("sequelize");
const config = require("../config/appConfig");

class Foto extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        filename: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "O campo filename não pode ser vazio",
            },
          },
        },
        original_name: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "O campo original_name não pode ser vazio",
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${config.url}/images/${this.getDataValue("filename")}`;
          },
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: "aluno_id" });
  }
}

module.exports = Foto;
