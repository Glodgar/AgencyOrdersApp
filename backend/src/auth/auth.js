const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { TOKEN_SECRET_JWT } = require('../../config');
const { addUser } = require('../controllers/userController');

// SPRAWDZENIE CZY ADRES EMAIL ZNAJDUJE SIE W BAZIE
function validateEmailAccessibility(email) {
    return User.findOne({ email: email }).then((result) => {return !result;}).then(console.log('------------ ',result));
};

// GENEROWANIE TOKENU
const generateTokens = (req, user) => {
  console.log('testy', user);
  const payload = {
    user: {
      id: user.id,
      name: user.imie,
      email: user.email,
      role: user.rola
    }
  };
    const ACCESS_TOKEN = jwt.sign(
        payload,
        TOKEN_SECRET_JWT,
        {expiresIn: 120000}
    );
    const REFRESH_TOKEN = jwt.sign(
        { sub: user._id, rol: user.rola, type: 'REFRESH_TOKEN' },
        TOKEN_SECRET_JWT,
        {expiresIn: 480}
    );
    console.log('req.body: ', req.body);
    console.log('user: ', user);
    console.log('payload: ', payload);
    return { accessToken: ACCESS_TOKEN, refreshToken: REFRESH_TOKEN }
};

// KONTROLER TWORZENIA UZYTKOWNIKA
exports.createUser = (req, res, next) => {
    validateEmailAccessibility(req.body.email).then((valid) => {
      if (valid) {
        const user = addUser(req);
        if(!user) return res.status(400).send('Error while adding user');
        return res.status(200).json(user);
      } else {
        res.status(409).send({message: "The request could not be completed due to a conflict"})
      }
    });
  };

// KONTROLER LOGOWANIA UZYTKOWNIKA
exports.loginUser = (req, res, next) => {
    User.findOne({email: req.body.email}, (err, user) => {
      console.log('findOne: ', user);
      if (err || !user) {
        res.status(401).send({message: "Unauthorized"})
        next(err)
      } else {
        if (bcrypt.compareSync(req.body.haslo, user.haslo)) {
          console.log('!!!', user);
          res.json(generateTokens(req, user));
        } else {
          res.status(401).send({
            message: "Invalid email/password"
          })
        }
      }
    }).select('haslo')
  };

// WERYFIKACJA TOKENA ODSWIEZAJACEGO
exports.refreshTokenVerify = (req, res, next) => {
    if(!req.body.refreshToken) {
      res.status(401).send({message: "Token refresh is missing"})
    }
    const BEARER = 'Bearer'
    const REFRESH_TOKEN = req.body.refreshToken.split(' ')
    if (REFRESH_TOKEN[0] !== BEARER) {
      return res.status(401).send({ error: "Token is not complete" })
    }
    jwt.verify(REFRESH_TOKEN[1], TOKEN_SECRET_JWT, function(err, payload) {
      if(err) {
        return res.status(401).send({ error: "Token refresh is invalid" });
      }
      User.findById(payload.sub, function(err, person){
        if (!person){
          return res.status(401).send({error: 'Person not found'});
        }
        return res.json(generateTokens(req, person));
      });
    });
  }