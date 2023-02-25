const bcrypt = require("bcrypt");

exports.generatePassword = (password) => {
  const salt = 10;
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(salt, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        resolve(hash);
        reject(err);
      });
    });
  });
};

exports.verifyPassword = (plainPassword, hashPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, hashPassword, (err, result) => {
      resolve(result);
      reject(err);
    });
  });
};
