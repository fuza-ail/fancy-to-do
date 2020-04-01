'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Todo extends Model {

  }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title can not be empty'
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: DataTypes.DATE,
    UserId: DataTypes.INTEGER,
    createdAt: new Date(),
    updatedAt: new Date()
  }, { 
    sequelize,
    hooks:{
      beforeCreate : (data,option)=>{
        data.status = false
      }
  } })

  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };
  return Todo;
};