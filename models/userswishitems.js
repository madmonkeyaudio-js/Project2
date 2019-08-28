'use strict';
module.exports = (sequelize, DataTypes) => {
  const usersWishitems = sequelize.define('usersWishitems', {
    userId: DataTypes.INTEGER,
    wishitemId: DataTypes.INTEGER
  }, {});
  usersWishitems.associate = function(models) {
    // associations can be defined here
  };
  return usersWishitems;
};