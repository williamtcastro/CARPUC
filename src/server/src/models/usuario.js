const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const db = require('../database');

const Usuario = db.define(
  'usuario',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    nome_completo: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true,
    },
    genero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: false,
      primaryKey: true,
    },
    celular: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    tier: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING(200),
      allowNull: true,
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
    tableName: 'usuario',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'email' }, { name: 'cpf' }],
      },
      {
        name: 'usuario',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'cpf' }, { name: 'celular' }, { name: 'email' }],
      },
      {
        name: 'Index 2',
        using: 'BTREE',
        fields: [{ name: 'id' }],
      },
    ],
  },
);

module.exports = Usuario;
