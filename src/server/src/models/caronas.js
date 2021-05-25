const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const db = require('../database');

const Caronas = db.define(
  'caronas',
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    veiculo: {
      type: DataTypes.STRING(7),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'veiculos',
        key: 'placa',
      },
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
    embarque: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desembarque: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    embarque_coordinates: {
      type: DataTypes.STRING(70),
      allowNull: true,
      defaultValue: '0',
    },
    desembarque_coordinates: {
      type: DataTypes.STRING(70),
      allowNull: true,
      defaultValue: '0',
    },
    embarque_horario: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    desembarque_horario: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    valor_carona_por_pessoa: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status_carona: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: 'caronas',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'id' }, { name: 'veiculo' }, { name: 'condutor' }],
      },
      {
        name: 'veiculo',
        using: 'BTREE',
        fields: [{ name: 'veiculo' }],
      },
      {
        name: 'condutor',
        using: 'BTREE',
        fields: [{ name: 'condutor' }],
      },
      {
        name: 'Index 4',
        using: 'BTREE',
        fields: [{ name: 'id' }],
      },
    ],
  },
);

module.exports = Caronas;
