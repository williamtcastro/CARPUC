const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const db = require('../database');

const Tokens = db.define(
  'tokens',
  {
    token: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true,
    },
    dono_token: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true,
      references: {
        model: 'usuario',
        key: 'cpf',
      },
    },
    status_token: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo: {
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
    tableName: 'tokens',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'token' }, { name: 'dono_token' }],
      },
      {
        name: 'tokens',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'token' }],
      },
      {
        name: 'dono_token',
        using: 'BTREE',
        fields: [{ name: 'dono_token' }],
      },
      {
        name: 'id',
        using: 'BTREE',
        fields: [{ name: 'id' }],
      },
    ],
  },
);

module.exports = Tokens;
