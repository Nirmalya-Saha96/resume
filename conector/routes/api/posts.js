const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');



//basically used for creating a post and getting a perticular post and all posts
//getting the liked and comments
//creating the likes and comments
//deleting the post and comments
//unlike a post


//private route used for create a post post api/posts
router.post('/',
  [
    auth,
      [
        body('text', 'Please enter text').not().isEmpty()
      ]
  ],
  async (req,res) => {
  //validating
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    //setting the onject
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
      githuburl: req.body.githuburl
    });

    const post = await newPost.save();

    //posts a profile
    const newProfilePost = {
      _id: post.id,
      text: req.body.text,
      githuburl: req.body.githuburl
    }

    const profile = await Profile.findOne({ user: req.user.id });

    profile.posts.unshift(newProfilePost);

    await profile.save();

    res.json(post);
  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//private route used for getting all the posts get api/posts
router.get('/', auth, async (req,res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//private route used for getting the particular post from a user get api/posts/:id
router.get('/:id', auth, async (req,res) => {
  try {
    const post = await Post.findById(req.params.id);

    if(!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  }catch(err) {
    console.error(err.message);
    //if the id is wrong
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

//private route used delete a post delete api/posts/:id
router.delete('/:id', auth, async (req,res) => {
  try {
    const post = await Post.findById(req.params.id);

    if(!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    //check user
    //if the post is by the user or not
    if(post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorised' });
    }

    //new
    const profile = await Profile.findOne({ user: req.user.id });

    //get the remove index
    const removeIndex = profile.posts.map(item => item.id).indexOf(req.params.id);

    profile.posts.splice(removeIndex, 1);

    await profile.save();

    await post.remove();

    res.json({ msg: 'Post removed' });
  }catch(err) {
    console.error(err.message);
    //if the id is wrong
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

//private route used like a post put api/posts/like/:id
router.put('/like/:id', auth, async (req,res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if the post is liked by the same user
    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Post is liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//private route used like a post put api/posts/unlike/:id
router.put('/unlike/:id', auth, async (req,res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if the post is not liked by the same user
    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: 'Post is not liked' });
    }

    //get remove index
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//private route used for create a comment post api/posts/comment/:id
router.post('/comment/:id',
  [
    auth,
      [
        body('text', 'Please enter text').not().isEmpty()
      ]
  ],
  async (req,res) => {
  //validating
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const post = await Post.findById(req.params.id);

    //setting up thr object
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };

    post.comments.unshift(newComment);

     await post.save();

    res.json(post.comments);
  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//private route used to delete a comment delete api/posts/comment/:id/:comment_id
router.delete('/comment/:id/:comment_id', auth, async (req,res) => {
  try {
    const post = await Post.findById(req.params.id);

    //get the comment
    const comment = post.comments.find(comment => comment.id === req.params.comment_id);

    //check if comment is present
    if(!comment) {
      return res.status(404).json({ msg: 'Comment is not present' });
    }

    //check user is present
    //if the comment is by the user
    if(comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not found' });
    }

    //get remove index
    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//private route used like a comment put api/posts/comment/like/:id
router.put('/comment/like/:id/:comment_id', auth, async (req,res) => {
  try {
    const post = await Post.findById(req.params.id);

    //get the comment
    const comment = post.comments.find(comment => comment.id === req.params.comment_id);

    //check if comment is present
    if(!comment) {
      return res.status(404).json({ msg: 'Comment is not present' });
    }

    //check if the post is liked by the same user
    if(comment.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Post is liked' });
    }

    comment.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(comment.likes);
  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//private route used like a comment put api/posts/comment/unlike/:id/:comment_id
router.put('/comment/unlike/:id/:comment_id', auth, async (req,res) => {
  try {
    const post = await Post.findById(req.params.id);

    //get the comment
    const comment = post.comments.find(comment => comment.id === req.params.comment_id);

    //check if comment is present
    if(!comment) {
      return res.status(404).json({ msg: 'Comment is not present' });
    }

    //check if the comment is not liked by the same user
    if(comment.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: 'Comment is not liked' });
    }

    //get remove index
    const removeIndex = comment.likes.map(like => like.user.toString()).indexOf(req.user.id);

    comment.likes.splice(removeIndex, 1);

    await post.save();

    res.json(comment.likes);
  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
