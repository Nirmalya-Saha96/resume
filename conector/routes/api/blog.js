const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');

const Blog = require('../../models/Blog');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


//basically used for creating blogs
//like and unlike a blog
//delete a blog


//private route used for create a blog post api/blog
router.post('/',
  [
    auth,
      [
        body('title', 'Please enter a title').not().isEmpty(),
        body('author', 'Please enter a author').not().isEmpty(),
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
    const newBlog = new Blog({
      title: req.body.title,
      text: req.body.text,
      author: req.body.author,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    const blog = await newBlog.save();

    res.json(blog);
  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//private route used for getting all the blogs get api/blog
router.get('/', auth, async (req,res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });

    res.json(blogs);
  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//private route used for getting the particular blog from a user get api/blog/:id
router.get('/:id', auth, async (req,res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if(!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    res.json(blog);
  }catch(err) {
    console.error(err.message);
    //if the id is wrong
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Blog not found' });
    }
    res.status(500).send('Server error');
  }
});

//private route used delete a blog delete api/blog/:id
router.delete('/:id', auth, async (req,res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if(!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    //check user
    //if the post is by the user or not
    if(blog.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorised' });
    }

    await blog.remove();

    res.json({ msg: 'Blog removed' });
  }catch(err) {
    console.error(err.message);
    //if the id is wrong
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Blog not found' });
    }
    res.status(500).send('Server error');
  }
});

//private route used like a post put api/blog/like/:id
router.put('/like/:id', auth, async (req,res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    //check if the blog is liked by the same user
    if(blog.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Blog is liked' });
    }

    blog.likes.unshift({ user: req.user.id });

    await blog.save();

    res.json(blog.likes);
  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//private route used unlike a blog put api/blog/unlike/:id
router.put('/unlike/:id', auth, async (req,res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    //check if the blog is not liked by the same user
    if(blog.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: 'Blog is not liked' });
    }

    //get remove index
    const removeIndex = blog.likes.map(like => like.user.toString()).indexOf(req.user.id);

    blog.likes.splice(removeIndex, 1);

    await blog.save();

    res.json(blog.likes);
  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
