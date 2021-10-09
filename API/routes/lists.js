const express = require('express');
const router = express.Router();

const List = require('../db/models/list.model');
const User = require('../db/models/user.model');
const { route } = require('./users');

//Authorization
const isAuth = (req, res, next) => {
    if(req.session.isAuth)
    {
        next()
    }
    else{
        res.json({success: false, msg: 'No Authorization'});
    }
}

//get all lists
router.get('/', isAuth, (req, res) => {
    List.getLists(req.session.userId, (err, lists) => {
        if(err) throw err;
        if(!lists){
            res.json({success: false, msg: 'no lists were found'});
        }
        else
        {
            res.json({success: true, msg: lists});
            console.log(req._userId);
        }
    })
});

// Search and Id by a given name
router.get('/:id', isAuth, (req, res) => {
    List.getListById(req.params.id, (err, list) => 
    {
        if(err) throw err;

        if(list)
        {
            res.json({succes: true, msg: list});
        }
        else
        {
            res.json({success: false, msg: 'Unable to Find a list with the given ID'});
        }
    });
});

//add a list

router.post('/', isAuth, (req, res) => {
    let newList = new List({
        title: req.body.title,
        _userId: req.session.userId
    });

    List.addList(newList, (err, list) => {
        if(err)
        {
            res.json({success: false, msg: 'Failed to add list ' + req.session.username + ' ' + req.session.userId});
        }
        else
        {
            res.json({success: true, msg: 'List successfuly added'});
        }
    });
});

//update list

router.patch('/:id', isAuth, (req, res) => {
    List.updateList(req.params.id, req.session.userId, req.body, (err, list) => {
        if(err) throw err;

        if(list)
        {
            res.json({success: true, msg: 'List successfuly updated'});
        }
        else
        {
            res.json({success: false, msg: 'Failed to update list ' + req.session.userId});
        }
    });
});

//remove a list
router.delete('/:id', isAuth, (req, res) => {
    List.removeList(req.params.id, req.session.userId, (err, list) => {
        if(err) throw err;
        
        if(list)
        {
            res.json({success: true, msg: 'Deleted List Successfully'});
        }
        else
        {
            res.json({success: false, msg: 'Unable to Find a list with the given ID'});
        }
    });
});

module.exports = router;