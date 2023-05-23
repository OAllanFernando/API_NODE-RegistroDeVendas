'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Venda.belongsTo(models.Pessoa, {
        foreignKey: 'pessoaId',
        as: 'pessoa'
      });
      Venda.hasMany(models.Produto, {
        foreignKey: 'produtoId',
        as: 'produto'
      });
    }
  }
  Venda.init({
    codigo: DataTypes.INTEGER,
    quantidade: DataTypes.INTEGER,
    pessoaId: DataTypes.INTEGER,
    total: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Venda',
  });
  return Venda;
};