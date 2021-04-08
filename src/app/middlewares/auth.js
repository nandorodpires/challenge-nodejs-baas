const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Nenhum token informado!" });
  }

  const parts = authHeader.split(" ");
  if (!parts.length === 2) {
    return res.status(401).json({ message: "Token inválido!" });
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: "Token mal formatado!" });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido!" });
    }
    req.accountId = decoded.id;
    return next();
  });
};
