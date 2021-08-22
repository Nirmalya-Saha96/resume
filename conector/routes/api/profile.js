const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');


//basically used to see others profile and me profile also whole profile of any user
//add experience and education
//update profile experience, education, projects, lisense, quicklinks and awards
//delete profile experience, education, projects, lisense, quickLinks and awards


//private route used to get current users api/profile/me
router.get('/me', auth, async (req,res) => {
    try {
        //geting the profile with user id
        const profile = await Profile.findOne({ user: req.user.id }).populate('user',
        ['name', 'avatar']);

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//private route used to create or update profile post api/profile
router.post('/',
    [auth,
         [
            body('status', 'Please enter a status').not().isEmpty(),
            body('skills', 'Please enter skills').not().isEmpty()
        ]
    ],
    async (req, res) => {
        //valodating
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //getting all the field to store in the db
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            linkedin,
            instagram,
            vedioid,
            colaborateid,
            chatid
        } = req.body;

        //bulid profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(bio) profileFields.bio = bio;
        if(status) profileFields.status = status;
        if(githubusername) profileFields.githubusername = githubusername;
        if(skills) {
            profileFields.skills = skills.split(',').map(skills => skills.trim());
        }

        //build social object
        profileFields.social = {};
        if(youtube) profileFields.social.youtube = youtube;
        if(twitter) profileFields.social.twitter = twitter;
        if(facebook) profileFields.social.facebook = facebook;
        if(linkedin) profileFields.social.linkedin = linkedin;
        if(instagram) profileFields.social.instagram = instagram;
        if(vedioid) profileFields.social.vedioid = vedioid;
        if(colaborateid) profileFields.social.colaborateid = colaborateid;
        if(chatid) profileFields.social.chatid = chatid;

        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if(profile) {
                //update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }

            //create
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        }catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

//public route to get all user get api/profile
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//public route to get profile by user id get api/profile/user/:user_id
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if(!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);

        //if the id is wrong
        if(err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }

        res.status(500).send('Server error');
    }
});

//public route to delete profile, user, post delete api/profile
router.delete('/', auth, async (req, res) => {
    try {
        //remove post
        await Post.deleteMany({ user: req.user.id });
        //remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        //remove user
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//private route to add profile exprerience user put api/profile/experence
router.put('/experience',
 [
     auth,
     [
        body('title', 'Please enter title').not().isEmpty(),
        body('company', 'Please enter company').not().isEmpty(),
        body('from', 'Please enter form date')
    ]
],
 async (req, res) => {
    //validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //getting all the required fields
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    //setting up the object
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//private route to delete profile experience user delete api/profile/experence/:exp_id
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //get the remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//private route to add profile education user put api/profile/education
router.put('/education',
 [
     auth,
     [
        body('school', 'Please enter school').not().isEmpty(),
        body('degree', 'Please enter degree').not().isEmpty(),
        body('fieldofstudy', 'Please enter field of study').not().isEmpty(),
        body('from', 'Please enter form date').not().isEmpty()
    ]
],
 async (req, res) => {
    //validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //getting all the required fields
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    //setting up the object
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//private route to delete profile education user delete api/profile/education/:edu_id
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //get the remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//private route to add profile projects user put api/profile/projects
router.put('/projects',
 [
     auth,
     [
        body('title', 'Please enter title').not().isEmpty(),
        body('about', 'Please enter about').not().isEmpty(),
        body('link', 'Please enter field of link').not().isEmpty()
    ]
],
 async (req, res) => {
    //validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //getting all the required fields
    const {
        title,
        about,
        link
    } = req.body;

    //setting up the object
    const newPro = {
        title,
        about,
        link
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.projects.unshift(newPro);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//private route to delete profile project user delete api/profile/projects/:pro_id
router.delete('/projects/:pro_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //get the remove index
        const removeIndex = profile.projects.map(item => item.id).indexOf(req.params.pro_id);

        profile.projects.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//private route to add profile lisense user put api/profile/lisense
router.put('/lisense',
 [
     auth,
     [
        body('title', 'Please enter title').not().isEmpty(),
        body('organization', 'Please enter organization').not().isEmpty(),
        body('credential', 'Please enter credential').not().isEmpty()
    ]
],
 async (req, res) => {
    //validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //getting all the required fields
    const {
        title,
        organization,
        credential
    } = req.body;

    //setting up the object
    const newLis = {
        title,
        organization,
        credential
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.lisense.unshift(newLis);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//private route to delete profile lisense user delete api/profile/lisense/:lis_id
router.delete('/lisense/:lis_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //get the remove index
        const removeIndex = profile.lisense.map(item => item.id).indexOf(req.params.lis_id);

        profile.lisense.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//private route to add profile quickLinks user put api/profile/links
router.put('/links',
 [
     auth,
     [
        body('title', 'Please enter title').not().isEmpty(),
        body('link', 'Please enter credential').not().isEmpty()
    ]
],
 async (req, res) => {
    //validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //getting all the required fields
    const {
        title,
        link
    } = req.body;

    //setting up the object
    const newLink = {
        title,
        link
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.quickLinks.unshift(newLink);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//private route to delete profile quickLinks user delete api/profile/links/:link_id
router.delete('/links/:link_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //get the remove index
        const removeIndex = profile.quickLinks.map(item => item.id).indexOf(req.params.link_id);

        profile.quickLinks.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//private route to add profile awards user put api/profile/awards
router.put('/awards',
 [
     auth,
     [
        body('title', 'Please enter title').not().isEmpty(),
        body('des', 'Please enter description').not().isEmpty()
    ]
],
 async (req, res) => {
    //validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //getting all the required fields
    const {
        title,
        des
    } = req.body;

    //setting up the object
    const newAward = {
        title,
        des
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.awards.unshift(newAward);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//private route to delete profile awards user delete api/profile/awards/:award_id
router.delete('/awards/:award_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //get the remove index
        const removeIndex = profile.awards.map(item => item.id).indexOf(req.params.award_id);

        profile.awards.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
