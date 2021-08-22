const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');

const Jobs = require('../../models/Jobs');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//private route used for create a job post api/job
router.post('/',
  [
    auth,
      [
        body('title', 'Please enter title').not().isEmpty(),
        body('company', 'Please enter company').not().isEmpty(),
        body('des', 'Please enter description').not().isEmpty()
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

    //setting up the object
    const newJob = new Jobs({
      title: req.body.title,
      company: req.body.company,
      des: req.body.des,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    const job = await newJob.save();

    const newProfileJob = {
      _id: job.id,
      title: req.body.title,
      company: req.body.company,
      des: req.body.des
    }

    const profile = await Profile.findOne({ user: req.user.id });

    profile.jobs.unshift(newProfileJob);

    await profile.save();

    res.json(job);
  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//private route used for getting all the jobs get api/jobs
router.get('/', auth, async (req,res) => {
  try {
    const jobs = await Jobs.find().sort({ date: -1 });

    res.json(jobs);
  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//private route used for getting the particular job from a user get api/job/:id
router.get('/:id', auth, async (req,res) => {
  try {
    const job = await Jobs.findById(req.params.id);

    if(!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    //check user
    //if job by the user
    if(job.user.toString() !== req.user.id) {
      const jobb = await Jobs.findById(req.params.id).select('-applicants');

      return res.json(jobb);
    }

    res.json(job);
  }catch(err) {
    console.error(err.message);
    //if the id is wrong
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server error');
  }
});

//private route used delete a job delete api/job/:id
router.delete('/:id', auth, async (req,res) => {
  try {
    const job = await Jobs.findById(req.params.id);

    if(!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    //check user
    //if job by the user
    if(job.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorised' });
    }

    //new
    const profile = await Profile.findOne({ user: req.user.id });

    //get the remove index
    const removeIndex = profile.jobs.map(item => item.id).indexOf(req.params.id);

    profile.jobs.splice(removeIndex, 1);

    await profile.save();

    await job.remove();

    res.json({ msg: 'Job removed' });
  }catch(err) {
    console.error(err.message);
    //if id is wrong
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server error');
  }
});

//private route used for create a apply post api/job/applicant/:id
router.post('/applicant/:id',
  [
    auth,
      [
        body('text', 'Please enter tell me about yourself').not().isEmpty(),
        body('urls', 'Please enter urls').not().isEmpty()
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

    const job = await Jobs.findById(req.params.id);

    //setting up the object
    const newApplicant = {
      text: req.body.text,
      urls: req.body.urls,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };
    job.applicants.unshift(newApplicant);

     await job.save();

    res.json(job.applicants);
  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//private route used to delete a apply delete api/job/applicant/:id/:applicant_id
router.delete('/applicant/:id/:applicant_id', auth, async (req,res) => {
  try {
    const job = await Jobs.findById(req.params.id);

    //get the apply
    const apply = job.applicants.find(applicant => applicant.id === req.params.applicant_id);

    //check if apply is present
    if(!apply) {
      return res.status(404).json({ msg: 'Apply is not present' });
    }

    //check user is present
    if(apply.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not found' });
    }

    //get remove index
    const removeIndex = job.applicants.map(applicant => applicant.user.toString()).indexOf(req.user.id);

    job.applicants.splice(removeIndex, 1);

    await job.save();

    res.json(job.applicants);
  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
