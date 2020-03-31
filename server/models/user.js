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
  };
  return User;
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmdXphaWwiLCJpYXQiOjE1ODU2MzUzNzJ9.qmcgK0Ne1V8zsjMDj9GA3mLaEmijDmvqZf9qYq0zqJ4