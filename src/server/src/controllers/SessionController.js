const { MD5 } = require('crypto-js');

const transporter = require('../mail');
const Tokens = require('../models/tokens');
const Usuario = require('../models/usuario');

module.exports = {
  async login(req, res) {
    const { token } = req;
    const { email, senha: password } = req.body;

    const nPerson = await Usuario.findOne({
      where: { email },
    });

    if (nPerson) {
      const oldTokens = await Tokens.findAll({
        where: { dono_token: nPerson.cpf, status_token: 0, tipo: 0 },
      });

      oldTokens.map(async (oldToken) => {
        await Tokens.update(
          { status_token: 1 },
          { where: { id: oldToken.id } },
        );
      });
    }

    if (!nPerson) {
      return res
        .status(400)
        .json({ status: false, message: 'person not found!' });
    }

    const { senha: dbPasswd, cpf } = nPerson;

    const incomingPasswd = MD5(password).toString();

    if (dbPasswd !== incomingPasswd) {
      return res
        .status(500)
        .json({ status: false, message: 'Wrong password provided' });
    }

    const newToken = await Tokens.create({
      token,
      tipo: 0,
      status_token: 0,
      dono_token: cpf,
    });

    if (newToken === null) {
      return res
        .status(500)
        .json({ status: 0, message: 'Error while creating JWT Token' });
    }

    const person = await Usuario.findByPk(cpf, {
      attributes: { exclude: ['senha', 'created_at', 'updated_at', 'cpf'] },
    });

    return res.status(200).json({ status: true, message: { token, person } });
  },

  async confirm(req, res) {
    const { token } = req.params;

    const { cpf: id, status_token: isValid } = await Tokens.findOne({
      where: { token, tipo: 2 },
    });

    if (isValid === null) {
      return res
        .status(400)
        .json({ status: false, message: 'Token provided is not valid!' });
    }

    const updateToken = await Tokens.update(
      { status_token: 1 },
      { where: { token } },
    );

    if (updateToken[0] !== 0) {
      return res
        .status(500)
        .json({ status: false, message: 'Unable to invalid token!' });
    }

    const { is_verified: isVerified } = await Usuario.findByPk(id);

    if (isVerified !== null) {
      return res
        .status(400)
        .json({ status: false, message: 'User already verified' });
    }

    const updatePerson = await Usuario.update(
      { is_verified: 1 },
      { where: { id } },
    );

    if (updatePerson[0] !== 1) {
      return res
        .status(500)
        .json({ status: false, message: 'Unable to verify de user!' });
    }

    return res
      .status(200)
      .json({ status: true, message: 'Client has been verified!' });
  },

  async recover(req, res) {
    const { token } = req;
    const { email } = req.body;

    const nPerson = await Usuario.findOne({ where: { email } });

    if (nPerson !== null) {
      const oldTokens = await Tokens.findAll({
        where: { person: nPerson.id, is_valid: 1, token_type: 'recover' },
      });

      oldTokens.map(async (oldToken) => {
        await Tokens.update({ is_valid: 0 }, { where: { id: oldToken.id } });
      });
    }

    await Tokens.create({
      token,
      token_type: 'recover',
      is_valid: 1,
      person: nPerson.id,
    });

    const message = {
      from: process.env.MAIL_SENDER,
      to: email,
      subject: 'Recuperar sua senha!',
      html: `<p>Copie o token a seguir <br>${token}</p>
      <a href="${process.env.APP_URL}/recover/new/">Recupere sua senha!</a>`,
    };

    // eslint-disable-next-line consistent-return
    transporter.sendMail(message, (error) => {
      if (error) {
        return res
          .status(500)
          .json({ status: false, message: 'Email couldn`t be sent' });
      }
    });

    return res
      .status(200)
      .json({
        status: true,
        message: 'User Registered please confirm your account',
      });
  },

  async reset(req, res) {
    const { id, token, password } = req.body;

    const incomingPasswd = MD5(password).toString();

    const person = await Usuario.findByPk(id);

    if (incomingPasswd === person.password) {
      return res
        .status(400)
        .json({
          status: false,
          message: 'Try a diferent password than last time',
        });
    }

    if (person === null) {
      return res
        .status(400)
        .json({ status: false, message: 'User dosent exists' });
    }

    const passUpdate = await Usuario.update(
      { password: incomingPasswd },
      { where: { id } },
    );

    if (passUpdate[0] !== 1) {
      return res
        .status(500)
        .json({ status: false, mesage: 'Unable to update password' });
    }

    const tokenUpdate = await Tokens.update(
      { is_valid: 0 },
      { where: { token } },
    );

    if (tokenUpdate[0] !== 1) {
      return res
        .status(500)
        .json({ status: false, mesage: 'Unable to update token' });
    }

    return res
      .status(200)
      .json({ status: true, message: 'User password updated' });
  },
};
