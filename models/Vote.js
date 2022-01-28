const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Vote extends Model {}

Vote.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'post',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'vote'
    }
);

// with these two methods we're allowing both the 
// User and Post models to query each other's information in the context of a vote
// User.belongsToMany(Post, {
//     through: Vote,
//     as: 'voted_posts',
//     foreignKey: 'user_id'
//   });
  
//   Post.belongsToMany(User, {
//     through: Vote,
//     as: 'voted_posts',
//     foreignKey: 'post_id'
//   });

module.exports = Vote;