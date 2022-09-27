const db = require("../../models");
const attributes = ["name"];
exports.register = async (body) => {
  const response = await db.Project.create(body);
  return response;
};

exports.getAll = async () => {
  const result = await db.Project.findAll({
    include: [
      {
        model: db.Employe,
        as: "employe",
        attributes: ["name", "email"],
      },
    ],
  });
  return result;
};

exports.getProject = async (id) => {
  const result = await db.Project.findOne({
    where: {
      PId: id,
    },
  });
  return result;
};
