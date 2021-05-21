const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const db = require('../database');

const Reembolsos = db.define(
  'reembolsos',
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
    status_reembolso: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valor_reembolso: {
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
    tableName: 'reembolsos',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'id_carona' }, { name: 'passageiro' }],
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
        name: 'Index 4',
        using: 'BTREE',
        fields: [{ name: 'id' }],
      },
    ],
  },
);

module.exports = Reembolsos;
