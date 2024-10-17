const Sequelize = require("sequelize");

class Disciplina extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "O campo titulo não pode ser vazio",
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
    this.belongsTo(models.Professor, { foreignKey: "professor_id" });
  }
}

module.exports = Disciplina;
