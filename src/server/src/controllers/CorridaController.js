/* eslint-disable consistent-return */
/* eslint-disable camelcase */
require('dotenv').config();

const Opencage = require('opencage-api-client');
// const { Op } = require('sequelize');

const Carona = require('../models/caronas');
const PassageiroCarona = require('../models/passageiro_carona');
const Usuario = require('../models/usuario');

module.exports = {
  async index(req, res) {
    // let query = '';
    // let querys = '';
    // const { status, user, flag_u, flag_s } = req.query;

    // if (Number(flag_u) === 0) query = { [Op.ne]: user };
    // else query = { [Op.eq]: user };

    // if (Number(flag_s) === 0) querys = { [Op.ne]: status };
    // else querys = { [Op.eq]: status };

    const caronas = await Carona.findAll({
      // where: {
      //   status_carona: querys,
      //   condutor: query,
      // },
      order: [['id', 'desc']],
      attributes: { exclude: ['created_at', 'updated_at'] },
    });

    const caronasList = [];

    // eslint-disable-next-line array-callback-return
    await Promise.all(
      caronas.map(async (i) => {
        const cpf = i.condutor;
        const obj = {
          id: i.id,
          veiculo: i.veiculo,
          condutor: i.condutor,
          embarque: i.embarque,
          embarque_coordinates: i.embarque_coordinates,
          embarque_horario: i.embarque_horario,
          desembarque: i.desembarque,
          desembarque_coordinates: i.desembarque_coordinates,
          desembarque_horario: i.desembarque_horario,
          valor_carona_por_pessoa: i.valor_carona_por_pessoa,
          status_carona: i.status_carona,
          nome_completo: await Usuario.findByPk(cpf).then(
            (r) => r.nome_completo,
          ),
        };
        caronasList.push(obj);
      })
    );

    if (caronas === null) {
      return res
        .status(500)
        .json({ status: false, message: 'Error while fetching caronas' });
    }

    return res.status(200).json({ status: true, message: caronasList });
  },

  async active(req, res) {
    const { cpf } = req.body;
    const id = await PassageiroCarona.findOne(
      {
        where: {
          passageiro: cpf,
          status_passageiro: 0,
        },
      },
      {
        attributes: { exclude: ['created_at', 'updated_at'] },
      }
    )
      .then((r) => r.id_carona)
      .catch(() =>
        res
          .status(400)
          .json({ status: false, message: 'Não existe carona ativa' })
      );

    if (id === null) {
      return res
        .status(400)
        .json({ status: false, message: 'Não existe carona ativa' });
    }

    const carona = await Carona.findByPk(id, {
      attributes: { exclude: ['created_at', 'updated_at'] },
    });

    const caronaN = {
      id: carona.id,
      veiculo: carona.veiculo,
      condutor: carona.condutor,
      embarque: carona.embarque,
      desembarque: carona.desembarque,
      embarque_horario: carona.embarque_horario,
      desembarque_horario: carona.desembarque_horario,
      desembarque_coordinates: carona.desembarque_coordinates,
      embarque_coordinates: carona.embarque_coordinates,
      valor_carona_por_pessoa: carona.valor_carona_por_pessoa,
      status_carona: carona.status_carona,
      nome_completo: await Usuario.findByPk(cpf).then((r) => r.nome_completo),
    };

    return res.status(200).json({
      status: true,
      message: caronaN,
    });
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

    const cpf = carona.condutor;

    const caronaN = {
      id: carona.id,
      veiculo: carona.veiculo,
      condutor: carona.condutor,
      embarque: carona.embarque,
      desembarque: carona.desembarque,
      embarque_horario: carona.embarque_horario,
      desembarque_horario: carona.desembarque_horario,
      desembarque_coordinates: carona.desembarque_coordinates,
      embarque_coordinates: carona.embarque_coordinates,
      valor_carona_por_pessoa: carona.valor_carona_por_pessoa,
      status_carona: carona.status_carona,
      nome_completo: await Usuario.findByPk(cpf).then((r) => r.nome_completo),
    };

    return res.status(200).json({
      status: true,
      message: caronaN,
    });
  },

  async store(req, res) {
    const {
      cpf,
      veiculo,
      embarque,
      desembarque,
      embarque_horario,
      desembarque_horario,
      valor_carona_por_pessoa,
    } = req.body;
    let flag = false;

    const newDate = new Date();

    const newDateE = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDay(),
      embarque_horario.split(':')[0],
      embarque_horario.split(':')[1],
    );
    const newDateD = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDay(),
      desembarque_horario.split(':')[0],
      desembarque_horario.split(':')[1],
    );

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

    const embarqueXY = await Opencage.geocode({ q: embarque })
      .then((data) => {
        const { results } = data;
        const { lat, lng } = results[0].bounds.northeast;
        return `${lat},${lng}`;
      })
      .catch(() => {});

    const desembarqueXY = await Opencage.geocode({ q: desembarque })
      .then((data) => {
        const { results } = data;
        const { lat, lng } = results[0].bounds.northeast;
        return `${lat},${lng}`;
      })
      .catch(() => {});

    const newCarona = await Carona.create({
      veiculo,
      condutor: cpf,
      embarque,
      embarque_horario: newDateE.getTime(),
      embarque_coordinates: embarqueXY.toString(),
      desembarque,
      desembarque_horario: newDateD.getTime(),
      desembarque_coordinates: desembarqueXY.toString(),
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
