/* eslint-disable consistent-return */
/* eslint-disable camelcase */
require('dotenv').config();

const PassageiroCarona = require('../models/passageiro_carona');

module.exports = {
  async index(req, res) {
    const { id_carona } = req.params;

    const passageiroCarona = await PassageiroCarona.findAll(
      { where: { id_carona } },
      {
        attributes: { exclude: ['created_at', 'updated_at'] },
      },
    );

    if (passageiroCarona === null) {
      return res
        .status(500)
        .json({ status: false, message: 'Error while fetching caronas' });
    }

    return res.status(200).json({ status: true, message: passageiroCarona });
  },

  async show(req, res) {
    const { id_carona } = req.params;

    const passageiroCarona = await PassageiroCarona.findByPk(id_carona, {
      attributes: { exclude: ['created_at', 'updated_at'] },
    });

    if (passageiroCarona === null) {
      return res
        .status(400)
        .json({ status: false, message: 'Passageiro não existe' });
    }

    return res.status(200).json({ status: true, message: passageiroCarona });
  },

  async store(req, res) {
    const { cpf } = req.body;
    const { id_carona } = req.params;
    let flag = false;

    const oldPC = await PassageiroCarona.findAll({
      where: { passageiro: cpf, id_carona },
    });

    oldPC.forEach((element) => {
      if (element.status_passageiro === 0) {
        flag = true;
      }
    });

    if (flag) {
      return res
        .status(400)
        .json({ status: false, message: 'Já existe uma carona ativa!' });
    }

    const newPC = await PassageiroCarona.create({
      passageiro: cpf,
      id_carona,
      status_passageiro: 0,
    });

    return res.status(200).json({ status: true, message: newPC });
  },

  async update(req, res) {
    const { id_carona } = req.params;
    const { status_passageiro } = req.body;

    const [a] = await PassageiroCarona.update(
      {
        status_passageiro,
      },
      { where: { id_carona } },
    );

    if (a !== 1) {
      return res.status(500).json({
        status: false,
        message: 'O Passageiro não foi atualizada!',
      });
    }

    return res
      .status(200)
      .json({ status: true, message: 'Passageiro atualizado!' });
  },

  async delete(req, res) {
    const { id, id_carona } = req.params;

    const passageiroCarona = await PassageiroCarona.findOne({
      where: {
        id,
        id_carona,
      },
    });

    if (passageiroCarona === null) {
      return res
        .status(400)
        .json({ status: false, message: 'Passageiro dosent exists!' });
    }

    await passageiroCarona.destroy();

    return res
      .status(200)
      .json({ status: true, message: 'Passageiro excluida!' });
  },
};
