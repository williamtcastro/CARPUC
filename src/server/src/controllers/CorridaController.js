/* eslint-disable consistent-return */
/* eslint-disable camelcase */
require('dotenv').config();

const Carona = require('../models/caronas');
const Usuario = require('../models/usuario');

Carona.hasOne(Usuario, {
  foreignKey: {
    name: 'nome_completo',
  },
});

module.exports = {
  async index(req, res) {
    let query;
    const { status } = req.query;
    if (status === undefined) {
      query = '';
    } else {
      query = { status_carona: status };
    }

    const caronas = await Carona.findAll({
      where: query,
      order: [['id', 'desc']],
      attributes: { exclude: ['created_at', 'updated_at'] },
    });

    if (caronas === null) {
      return res
        .status(500)
        .json({ status: false, message: 'Error while fetching caronas' });
    }

    return res.status(200).json({ status: true, message: caronas });
  },

  async show(req, res) {
    const { id } = req.params;

    const carona = await Carona.findByPk(id, {
      attributes: { exclude: ['created_at', 'updated_at'] },
    });

    if (carona === null) {
      return res
        .status(400)
        .json({ status: false, message: 'Carona não existe' });
    }

    const { condutor: cpf } = carona;

    const user = await Usuario.findByPk(cpf, {
      attributes: {
        exclude: [
          'created_at',
          'updated_at',
          'bio',
          'tier',
          'email',
          'senha',
          'genero',
          'cpf',
          'id',
        ],
      },
    });

    return res.status(200).json({
      status: true,
      message: { carona, condutor: user },
    });
  },

  async store(req, res) {
    const {
      cpf,
      veiculo,
      embarque,
      desembarque,
      // embarque_horario,
      // desembarque_horario,
      valor_carona_por_pessoa,
    } = req.body;
    let flag = false;

    const newDate = new Date();

    const oldCaronas = await Carona.findAll({
      where: { condutor: cpf, veiculo },
    });

    oldCaronas.forEach((element) => {
      if (element.status_carona === 0) {
        flag = true;
      }
    });

    if (flag) {
      return res
        .status(400)
        .json({ status: false, message: 'Já existe uma carona ativa!' });
    }

    const newCarona = await Carona.create({
      veiculo,
      condutor: cpf,
      embarque,
      desembarque,
      embarque_horario: newDate.getTime(),
      desembarque_horario: newDate.getTime(),
      valor_carona_por_pessoa,
      status_carona: 0,
    });

    return res.status(200).json({ status: true, message: newCarona });
  },

  async update(req, res) {
    const { id } = req.params;
    const { status_carona } = req.body;

    const [a] = await Carona.update(
      {
        status_carona,
      },
      { where: { id } }
    );

    if (a !== 1) {
      return res.status(500).json({
        status: false,
        message: 'A Carona não foi atualizada!',
      });
    }

    return res
      .status(200)
      .json({ status: true, message: 'Carona atualizado!' });
  },

  async delete(req, res) {
    const { id } = req.params;

    const carona = await Carona.findByPk(id);

    if (carona === null) {
      return res
        .status(400)
        .json({ status: false, message: 'Carona dosent exists!' });
    }

    await carona.destroy();

    return res.status(200).json({ status: true, message: 'Carona excluida!' });
  },
};
