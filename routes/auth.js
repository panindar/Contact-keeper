 const express = require('express');
 const router = express.Router();
 const bcrypt = require('bcrypt');
 const User = require('../models/User');
 const jwt = require('jsonwebtoken');
 const config = require('config');
 const auth = require('../middleware/auth');
 const {check, validationResult} = require('express-validator');


//@route Get auth/api
//@desc Get user logged in
//@access Private
router.get('/', auth, async(req, res) => {
   try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
   } catch (err) {
       console.error(err.message);
       res.status(500).send('server Error');
   }
});

//@route post auth/api
//@desc Get user log in
//@access Public
router.post('/', [
    check('email','please enter a valid email').isEmail(),
    check('password', 'please enter the password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }

    const {email, password} =req.body;
    try {
        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({msg: 'invalid credentials'});
        }
        const ismatch = await bcrypt.compare(password, user.password);
        if(!ismatch){
            return res.status(400).json({msg: 'inavalid credentials'});
        }
        const payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'),{
            expiresIn:360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server Error');
    }
});

module.exports = router;