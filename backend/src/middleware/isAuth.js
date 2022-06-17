const jwt = require('jsonwebtoken');
const { TOKEN_SECRET_JWT } = require('../../config');

// WERYFIKACJA TOKENOW
module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).send({ error: 'Token is missing' });
    }

    const BEARER = 'Bearer'
    const AUTHORIZATION_TOKEN = req.headers.authorization.split(' ')
    
    if (AUTHORIZATION_TOKEN[0] !== BEARER) {
      return res.status(401).send({ error: "Token is not complete" })
    }
    try {
      console.log(AUTHORIZATION_TOKEN);
      const verified = jwt.verify(AUTHORIZATION_TOKEN[1], TOKEN_SECRET_JWT);
      req.user = verified.user;
      next();
    } catch (error) {
      return res.status(401).send({ error: "Token is invalid" });
    }
  };