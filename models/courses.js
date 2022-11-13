'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Courses.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
   description: {
      type: DataTypes.TEXT,
    },
    estimatedTime: {
      type: DataTypes.STRING,
    },
    materialsNeeded: {
      type: DataTypes.STRING,
  },
    sequelize,
    modelName: 'Courses',
  });
  Courses.associate = (models) => {
    Courses.belongsTo(models.Users, { 
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      }    
    },
  )};
  return Courses;
};