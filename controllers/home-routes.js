const { DataTypes } = require('sequelize/dist');

// import
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// set up the main homepage route
const router = require('express').Router();

// In this case, we're going to take a single "post" object and pass it to the homepage.handlebars template.
// Each property on the object (id, post_url, title, etc.) becomes available in the template using the Handlebars.js {{ }} syntax.
router.get('/', (req, res) => {
    Post.findAll({
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
// pass a single post object into the homepage template
        console.log(dbPostData[0]);
// This will loop over and map each Sequelize object into a serialized version of itself, saving the results in a new posts array
        const posts = dbPostData.map(post => post.get({ plain:true }));
// To serialize the object down to only the properties you need, you can use Sequelize's get() method.
        res.render('homepage', { posts });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;