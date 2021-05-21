const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const db = require('../database');

const Veiculos = db.define(
  'veiculos',
  {
    placa: {
      type: DataTypes.STRING(7),
      allowNull: false,
      primaryKey: true,
    },
    marca_modelo: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cor: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    condutor: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true,
      references: {
        model: 'usuario',
        key: 'cpf',
      },
    },
    assentos_disponiveis: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    Sequelize,
    tableName: 'veiculos',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'placa' }, { name: 'condutor' }],
      },
      {
        name: 'veiculos',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'placa' }],
      },
      {
        name: 'condutor',
        using: 'BTREE',
        fields: [{ name: 'condutor' }],
      },
      {
        name: 'Index 3',
        using: 'BTREE',
        fields: [{ name: 'id' }],
      },
    ],
  },
);

module.exports = Veiculos;
