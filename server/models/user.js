'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model{
  
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:false
      },
      unique:true
    },
    password: DataTypes.STRING,
    createdAt: new Date(),
    updatedAt: new Date()
  },{sequelize})

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};