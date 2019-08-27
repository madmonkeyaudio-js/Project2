'use strict';
module.exports = (sequelize, DataTypes) => {
  const item = sequelize.define('item', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    shortDescription: DataTypes.STRING
  }, {});
  item.associate = function(models) {
     // associations can be defined here
    models.item.belongsToMany(models.user, {through: 'usersItems'})
   
  };
  return item;
};