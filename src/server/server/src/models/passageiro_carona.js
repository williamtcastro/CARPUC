const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const db = require('../database');

const PassageiroCarona = db.define(
  'passageiro_carona',
  {
    passageiro: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true,
      references: {
        model: 'usuario',
        key: 'cpf',
      },
    },
    id_carona: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    status_passageiro: {
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
    tableName: 'passageiro_carona',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'passageiro' }, { name: 'id_carona' }, { name: 'id' }],
      },
      {
        name: 'passageiro',
        using: 'BTREE',
        fields: [{ name: 'passageiro' }],
      },
      {
        name: 'id_carona',
        using: 'BTREE',
        fields: [{ name: 'id_carona' }],
      },
      {
        name: 'Index 3',
        using: 'BTREE',
        fields: [{ name: 'id' }],
      },
    ],
  },
);

module.exports = PassageiroCarona;
