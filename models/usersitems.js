'use strict';
module.exports = (sequelize, DataTypes) => {
  const usersItems = sequelize.define('usersItems', {
    userId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER
  }, {});
  usersItems.associate = function(models) {
    // associations can be defined here
  };
  return usersItems;
};