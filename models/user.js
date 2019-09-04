'use strict';
const bcrypt = require('bcryptjs');


module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide your firstname.'
        }
      }
    },
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Please give a valid email address'
        }
      }
    },
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 32], 
          msg: 'Your password should be between 8 and 32 characters in length.'
        }
      }
    },
    birthday: DataTypes.DATE,
    admin: {
      type: DataTypes.BOOLEAN, 
      defaultValue: false
    },
    bio: DataTypes.TEXT,
    profile: {
      type: DataTypes.TEXT, 
      validate: {
        isUrl: {
          msg: 'Provide a valid picture.'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (pendingUser) => {
        if (pendingUser && pendingUser.password){
          //Hash the password with BCrypt
          let hash = bcrypt.hashSync(pendingUser.password, 12);
          //Reassign users password to the hashed version of that password
          pendingUser.password = hash;
        }
      }
    }
  });

  user.associate = function(models) {
    // associations can be defined here
    models.user.belongsToMany(models.item, {through: 'usersItems'})
    models.user.belongsToMany(models.wishitems, {through: 'usersWishitems'})
  };

  // Custom function: validPassword
  //This will check an instance of the model (specific user) against a typed in password
  //User bcrypt to compare hashes

  //Every user has a version of this function, SO we can user THIS
  user.prototype.validPassword = function(typedInPassword) {
    return bcrypt.compareSync(typedInPassword, this.password);
  }
  return user;
};