const db = require("../../models");
const bcrypt = require("bcrypt");
exports.register = async (employe) => {
  const salt = await bcrypt.genSalt(10);
  employe.password = await bcrypt.hash(employe.password, salt);
  const response = await db.Employe.create(employe);
  return { response };
};
exports.empCheck = async (employe) => {
  let response = await db.Employe.findOne({
    where: {
      name: employe.name,
    },
  });
  if (!response) {
    response = await db.Employe.findOne({
      where: {
        email: employe.email,
      },
    });
    if (response) {
      return "Email id exists";
    }
  } else {
    return "username already exists";
  }
  return response;
};
