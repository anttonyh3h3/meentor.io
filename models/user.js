'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Course, {through: models.UserCourse })
      User.hasMany(models.UserCourse)
      User.hasOne(models.Course, { as: 'Instructor' })
      User.hasMany(models.Mentoring)
    }
  }
  User.init({
    fullName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    mentoringDate: DataTypes.DATE,
    roles: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};