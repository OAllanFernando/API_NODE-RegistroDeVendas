'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Produto.belongsToMany(models.Venda, {
        through: models.ProdutoVenda,
        foreignKey: 'produtoId',
      });
      Produto.hasMany(models.ProdutoVenda, {
        foreignKey: 'produtoId',
      });
      
    }
  }
  Produto.init({
    codigo: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    preco: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Produto',
  });
  return Produto;
};