const bcrypt = require('bcryptjs')
const { nanoid } = require('nanoid')

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
      User.belongsToMany(models.Course, {through: models.UserCourse})
      User.hasMany(models.UserCourse)
      User.hasOne(models.Course)
      User.hasMany(models.Mentoring)
    }

    inputDate(){
      return this.mentoringDate.toISOString().slice(0, 10)
    }
  }
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Full Name required'
        },
        notEmpty: {
          msg: 'Full Name required'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username required'
        },
        notEmpty: {
          msg: 'Username required'
        }
      }
    },
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Email must be valid'
        },
        notNull: {
          msg: 'Email required'
        },
        notEmpty: {
          msg: 'Email required'
        }
      }
    },
    mentoringDate: DataTypes.DATE,
    roles: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, options) {
        user.password = nanoid()

        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(user.password, salt)

        user.password = hash
      }
    }
  });
  return User;
};