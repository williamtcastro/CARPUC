/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable camelcase */
require('dotenv').config();

const Veiculos = require('../models/veiculos');

module.exports = {
  async index(req, res) {
    const veiculos = await Veiculos.findAll();
    return res.json(veiculos);
  },

  async show(req, res) {
    const { placa } = req.params;

    const veiculo = await Veiculos.findByPk(placa.toUpperCase(), {
      attributes: { exclude: ['id', 'created_at', 'updated_at'] },
    });

    if (veiculo === null) {
      return res
        .status(400)
        .json({ status: false, message: 'Veiculo não existe!' });
    }

    return res.status(200).json({ status: true, message: veiculo });
  },

  async store(req, res) {
    const {
      cpf, placa, marca_modelo, ano, cor, assentos_disponiveis,
    } = req.body;

    const newVeiculo = await Veiculos.create({
      placa: placa.toUpperCase(),
      marca_modelo,
      ano,
      cor,
      condutor: cpf,
      assentos_disponiveis,
    });

    return res.status(200).json({ status: true, message: newVeiculo });
  },

  async update(req, res) {
    const { placa } = req.params;
    const { assentos_disponiveis } = req.body;

    if (assentos_disponiveis <= 0) {
      return res.status(400).json({
        status: true,
        message: 'O numero de assentos não podem ser menor que 0',
      });
    }

    const [a] = await Veiculos.update(
      {
        assentos_disponiveis,
      },
      { where: { placa: placa.toUpperCase() } },
    );

    if (a !== 1) {
      return res.status(500).json({
        status: false,
        message: 'O veiculo não foi atualizado!',
      });
    }

    return res
      .status(200)
      .json({ status: true, message: 'Veiculo atualizado!' });
  },

  async delete(req, res) {
    const { placa } = req.params;

    const veiculo = await Veiculos.findByPk(placa.toUpperCase());

    if (veiculo === null) {
      return res
        .status(400)
        .json({ status: false, message: 'Veiculo dosent exists!' });
    }

    await veiculo.destroy();

    return res.status(200).json({ status: true, message: 'Veiculo excluido!' });
  },
};
