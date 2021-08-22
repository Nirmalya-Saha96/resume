const router = require("express").Router();
const Conversation = require("../../models/Conversation");

//new conv

router.post("/", async (req, res) => {

  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//private route used delete a blog delete api/blog/:id
router.delete('/:id', async (req,res) => {
  try {
    const blog = await Conversation.findById(req.params.id);

    if(!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
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



module.exports = router;
