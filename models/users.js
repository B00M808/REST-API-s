'use strict';

//require bcrypt

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Users.init({
    firstName: {
      type: DataTypes.STRING,
    },
   lastName: {
      type: DataTypes.STRING,
    },
    emailAddress: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    }}, {
    sequelize,
    modelName: 'Users',

  });

    Users.associate = (models) => {
      Users.hasMany(models.Courses, { 
        foreignKey: {
          fieldName: 'userId', 
          allowNull: false,
        },    
      });
    };
  

  return Users;
};

