const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('../db/mongoose');
const User = require('../db/models/user.model');


router.post('/register', (req, res) => {
    let newUser = new User ({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err)
        {
            res.json({status: false, msg: 'failed to register user'});
        }
        else
        {
            res.json({status: true, msg: 'User Successfully Added', user});
        }
    });
    
});

router.get('/:username', (req, res) => {
    User.getUserByUsername(req.params.username, (err,user) => {
        if(err) throw err;

        if(!user)
        {
            res.json({success: false, msg: req.params.username});
        }
        else
        {
            res.json({success: true, msg:  user});
        }
    });
});

router.post('/login', (req, res) => 
{
    let {username, email, password} = req.body;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;

        if(!user)
        {
            res.json({success: false, msg: 'User not found'});
        }
        else
        {
            User.comparePassword(password, user.password, (err, isMatch) =>
            {
                if(err) throw err;
                
                if(!isMatch)
                {
                    res.json({success: false, msg: "Wrong Password"});
                }
                else
                {
                    req.session.isAuth = true;
                    req.session.username = user.username;
                    req.session.userId = user._id
                    res.status(200).send(user);
                }
            });
        }
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) throw err;
        res.json({success:true, msg: 'Logout Successfully'})
    })
})

module.exports = router;