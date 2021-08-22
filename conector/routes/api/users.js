const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');


//bassically used for register the user
//and store the information in db



//public route used for register users
router.post('/',
[
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please enter proper email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
async (req,res) => {
    //validating
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    //getting the name email password to register teh user
    //and store in the db
    const { name, email, password } = req.body;

    try{
        let user = await User.findOne({ email });

        if(user){
            return res.status(400).json({ errors: [{ msg: 'User already exists'}]});
        }

        //setting up the avatar
        const avatar = gravatar.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        //creating a json object for the user
        user = new User({
            name,
            email,
            avatar,
            password
        });

        const salt = await bcrypt.genSalt(10);

        //setting up the password with bcrypt
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        //getting up the token
        jwt.sign(payload,
             config.get('jwtSecret'),
             { expiresIn: 360000 },
             (err, token) => {
                 if(err) throw err;
                 res.json({ token });
             }
        );
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
