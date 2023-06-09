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
      });

      Venda.belongsToMany(models.Produto, {
        through: models.ProdutoVenda,
        foreignKey: 'vendaId',
      });


      Venda.hasMany(models.ProdutoVenda, {
        foreignKey: 'vendaId',
      });
    }
  
}
Venda.init({
  codigo: DataTypes.INTEGER,
  pessoaId: DataTypes.INTEGER,
  total: DataTypes.DOUBLE
  
}, {
  sequelize,
  modelName: 'Venda',
});
return Venda;
};