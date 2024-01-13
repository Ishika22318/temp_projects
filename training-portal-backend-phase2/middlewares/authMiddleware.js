const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const requireAuth = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, decode) => {
      if (err) {
        console.log(err);
        return res.status(401).send({ success: false, message: "Auth Failed", statuscode: 401 });
      }
      req.data = decode;
      next();
    });
  } else {
    res.status(401).send({ success: false, message: "Token not found", statuscode: 401 });
  }
};

module.exports = { requireAuth };
