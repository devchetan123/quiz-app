const jwt = require('jsonwebtoken');
const { error, http } = require('../utilities/response.service');

const authenticater = async (req, res, next) => {

  try {
    const headers = req.headers;
    const accesstoken = headers.authorization

    if (!(accesstoken && accesstoken.startsWith("Bearer "))) {
      throw new Error("Invalid User");
    }

    let token = accesstoken.split(" ")[1]
    let secretKey = 'dogzone';

    let user;

    jwt.verify(token, secretKey, function (err, decoded) {
      if (err) {
        // Handle error
        throw new Error("Token verification failed")
      } else {
        user = decoded;
      }
    });

    if (user) {
      req.user = user
    }
    else {
      throw new Error("Invalid activity")
    }
  }
  catch (err) {
    const data = error(err, err.message);
    const response = http(req, data);
    res.status(response.statusCode).json(response);
  }

  return next()
}

module.exports = authenticater;