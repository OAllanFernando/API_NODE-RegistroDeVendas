'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bairro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bairro.belongsTo(models.Cidade, {
        foreignKey: 'cidadeId',
        as: 'cidade'
      });
    }
  }
  Bairro.init({
    codigo: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    cidadeId: DataTypes.INTEGER
  
  }, {
    sequelize,
    modelName: 'Bairro',
  });
  return Bairro;
};