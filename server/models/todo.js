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
          args: false,
          msg: 'Title can not be empty'
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: DataTypes.DATE,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    sequelize,
    hooks: {
      beforeDestroy: (model, option) => {
        console.log('masuk hooks')
      }
    }
  })

  Todo.associate = function (models) {
    // associations can be defined here
  };
  return Todo;
};