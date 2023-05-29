'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProdutoVenda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProdutoVenda.belongsTo(models.Venda, {
        foreignKey: 'vendaId',        
      });
    }
  }
  ProdutoVenda.init({
    codigo: DataTypes.INTEGER,
    quantidade: DataTypes.INTEGER,
    produtoId: DataTypes.INTEGER,
    vendaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProdutoVenda',
  });
  return ProdutoVenda;
};