const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

const validatePassword = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}

const secretKey = 'dogzone';

const generateToken = (payload) => {
  const token = jwt.sign(payload, secretKey);
  return token;
}

const reqBodyAdder = (body, items) => {
  
  for(let key in items){
    let value = items[key];
    body[key] = value;
  }
  
}


module.exports = {
  hashPassword, validatePassword, generateToken, reqBodyAdder
}