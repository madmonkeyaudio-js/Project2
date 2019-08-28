'use strict';
module.exports = (sequelize, DataTypes) => {
  const wishitem = sequelize.define('wishitem', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    productId: DataTypes.INTEGER
  }, {});
  wishitem.associate = function(models) {
    // associations can be defined here
    models.wishitem.belongsToMany(models.user, {through: 'usersWishitems'})
  };
  return wishitem;
};