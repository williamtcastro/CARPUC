const jwt = require('jsonwebtoken');

const Token = require('../../models/tokens');
const People = require('../../models/usuario');

module.exports = {
  // eslint-disable-next-line consistent-return
  async validateRecoverJWT(req, res, next) {
    const { token } = req.body;

    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: 'No token provided.' });
    }

    const email = jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .json({ status: false, message: 'Failed to authenticate token.' });
      }

      return decoded.email;
    });

    const person = await People.findOne({ where: { email } });

    const { status_token: isValid, tipo: tokenType } = await Token.findOne({
      where: { token, dono_token: person.cpf },
    });

    if (isValid !== 0) {
      return res
        .status(400)
        .json({ status: false, message: 'Token JWT is not valid anymore!' });
    }

    if (tokenType !== 1) {
      return res
        .status(400)
        .json({ status: false, message: 'Token is not valid for recover!' });
    }

    req.body.cpf = person.cpf;

    next();
  },

  // eslint-disable-next-line consistent-return
  async validateJWT(req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: 'No token provided.' });
    }

    const email = jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .json({ status: false, message: 'Failed to authenticate token.' });
      }

      return decoded.email;
    });

    const person = await People.findOne({ where: { email } });

    const { status_token: isValid, tipo: tokenType } = await Token.findOne({
      where: { token, dono_token: person.cpf },
    });

    if (isValid !== 0) {
      return res
        .status(400)
        .json({ status: false, message: 'Token JWT is not valid anymore!' });
    }

    if (tokenType !== 0) {
      return res
        .status(400)
        .json({ status: false, message: 'Token is not valid for auth!' });
    }

    req.body.cpf = person.cpf;

    next();
  },

  // eslint-disable-next-line consistent-return
  async generateJWT(req, res, next) {
    const { email } = req.body;

    const token = jwt.sign({ email }, process.env.SECRET, {
      // expiresIn: 3000, colocar codigo de expiracao no token
    });

    if (!token) {
      return res
        .status(500)
        .json({ status: false, message: 'Erro creating JWT token' });
    }

    req.token = token;

    next();
  },
};
