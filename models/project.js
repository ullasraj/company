"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(model) {
      // define association here
      Project.belongsTo(model.Employe, { foreignKey: "empId", as: "employe" });
    }
  }
  Project.init(
    {
      PId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      departement: DataTypes.STRING,
      empId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Employes",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
