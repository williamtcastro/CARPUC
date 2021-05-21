/* eslint-disable camelcase */
const { MD5 } = require('crypto-js');

const transporter = require('../mail');
const Tokens = require('../models/tokens');
const Usuario = require('../models/usuario');

module.exports = {
  async index(req, res) {
    const person = await Usuario.findAll();

    if (person === null) {
      return res
        .status(500)
        .json({ status: false, message: 'Error while fetching people' });
    }

    return res.status(200).json({ status: true, message: person });
  },

  async indexOne(req, res) {
    const uid = req.params.cpf;
    const { id } = req.body;

    const rId = await Usuario.findByPk(id);

    if (rId.is_admin === 0) {
      return res.status(400).json({ status: false, message: 'User not admin' });
    }

    const person = await Usuario.findByPk(uid, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });

    if (person === null) {
      return res
        .status(500)
        .json({ status: false, message: 'Error while fetching people' });
    }

    return res.status(200).json({ status: true, message: person });
  },

  async show(req, res) {
    const { id } = req.body;

    const person = await Usuario.findByPk(id, {
      attributes: { exclude: ['password', 'created_at', 'updated_at'] },
    });

    if (person === null) {
      return res
        .status(400)
        .json({ status: false, message: 'Person dosen`t exists' });
    }

    return res.status(200).json({ status: true, message: person });
  },

  async store(req, res) {
    const { token } = req;
    const {
      nome,
      email,
      senha,
      cpf,
      celular,
      genero,
    } = req.body;

    const emailExists = await Usuario.findOne({ where: { email } });

    if (emailExists !== null) {
      return res
        .status(400)
        .json({ status: false, message: 'Email already resgistered' });
    }

    const documentExists = await Usuario.findOne({ where: { cpf } });

    if (documentExists !== null) {
      return res
        .status(400)
        .json({ status: false, message: 'CPF already resgistered' });
    }

    const hashPasswd = await MD5(senha).toString();

    const person = await Usuario.create({
      nome_completo: nome,
      cpf,
      genero,
      email,
      celular,
      tier: 0,
      senha: hashPasswd,
    });

    if (!person) {
      return res
        .status(500)
        .json({ status: false, message: 'Error while creating new person' });
    }

    await Tokens.create({
      token,
      tipo: 2,
      status_token: 0,
      dono_token: person.cpf,
    });

    const message = {
      from: process.env.MAIL_SENDER,
      to: email,
      subject: 'PUCAR - Confirme seu email!',
      html: `<p>Confirme seu e-mail com o LINK abaixo...</p>
      <a href="${process.env.APP_URL}/confirm/${token}">Confirme aqui!</a>`,
    };

    // eslint-disable-next-line consistent-return
    transporter.sendMail(message, (error) => {
      if (error) {
        return res
          .status(500)
          .json({ status: false, message: 'Email couldn`t be sent' });
      }
    });

    return res.status(200).json({
      status: true,
      message: 'User Registered please confirm your account',
    });
  },

  async delete(req, res) {
    const { cpf } = req.params;

    const person = await Usuario.findByPk(cpf);

    if (person === null) {
      return res
        .status(400)
        .json({ status: false, message: 'Person dosent exists!' });
    }

    await person.destroy();

    return res.status(200).json({ status: true, message: 'Person deleted' });
  },

  async updateTier(req, res) {
    const { tier, cpf } = req.body;

    const [a] = await Usuario.update(
      { tier },
      {
        where: {
          cpf,
        },
      },
    );

    if (a !== 1) {
      return res.status(500).json({});
    }

    return res.status(200).json({});
  },
};
