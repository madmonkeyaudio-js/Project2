'use strict';
module.exports = (sequelize, DataTypes) => {
  const wishitems = sequelize.define('wishitems', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    productId: DataTypes.INTEGER
  }, {});
  wishitems.associate = function(models) {
    // associations can be defined here
  };
  return wishitems;
};