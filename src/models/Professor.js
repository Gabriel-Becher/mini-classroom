const Sequelize = require("sequelize");

class Professor extends Sequelize.Model {
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

module.exports = Professor;
