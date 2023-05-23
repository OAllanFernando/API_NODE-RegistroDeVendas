'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pessoa.belongsTo(models.Endereco, {
        foreignKey: 'enderecoId',
        as: 'endereco'
      });
    }
  }
  Pessoa.init({
    nome: DataTypes.STRING,
    codigo: DataTypes.INTEGER,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
    enderecoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pessoa',
  });
  return Pessoa;
};