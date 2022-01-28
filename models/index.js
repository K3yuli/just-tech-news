
const User = require('./User');
const Post = require("./Post");

// creat association
// This association creates the reference for the id column in the User model
// to link to the corresponding foreign key pair, which is the user_id in the Post model
User.hasMany(Post, {
    foreignKer: 'user_id'
});

// reverse association
// The constraint we impose here is that a post can belong to one user, but not many users
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Post };