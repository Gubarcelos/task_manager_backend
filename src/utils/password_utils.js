const bcrypt = require('bcrypt');

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function comparePassword(password, userPassword) {
  return await bcrypt.compare(password,userPassword);
}
module.exports = {
  encryptPassword,
  comparePassword
};