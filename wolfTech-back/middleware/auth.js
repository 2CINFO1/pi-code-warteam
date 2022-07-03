const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(403).json("A token is required for authentication");
  }
  try {
    let token = req.headers['authorization'].split(' ');
    const decoded = jwt.verify(token[1], 'wolf-tech');
    req.user = decoded;
  } catch (err) {
    return res.status(401).json("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;